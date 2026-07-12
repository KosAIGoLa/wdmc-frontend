<script lang="ts">
	import { onMount } from 'svelte';

	type Kind = 'dust' | 'glow' | 'spark' | 'star' | 'ring' | 'petal';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		r: number;
		baseR: number;
		baseOpacity: number;
		hue: number;
		sat: number;
		light: number;
		phase: number;
		speed: number;
		kind: Kind;
		spin: number;
		spinV: number;
		life: number;
		maxLife: number;
		depth: number; // 0 far … 1 near — parallax + size scale
		trail: boolean;
	}

	interface Meteor {
		x: number;
		y: number;
		vx: number;
		vy: number;
		len: number;
		life: number;
		maxLife: number;
		hue: number;
		width: number;
	}

	interface Burst {
		x: number;
		y: number;
		vx: number;
		vy: number;
		r: number;
		life: number;
		maxLife: number;
		hue: number;
	}

	let canvas: HTMLCanvasElement | undefined = $state();
	let reduced = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduced = mq.matches;
		const onMq = () => {
			reduced = mq.matches;
		};
		mq.addEventListener('change', onMq);

		if (reduced || !canvas) {
			return () => mq.removeEventListener('change', onMq);
		}

		const rawCtx = canvas.getContext('2d', { alpha: true });
		if (!rawCtx) {
			return () => mq.removeEventListener('change', onMq);
		}
		const ctx = rawCtx;

		let raf = 0;
		let w = 0;
		let h = 0;
		let dpr = 1;
		let particles: Particle[] = [];
		let meteors: Meteor[] = [];
		let bursts: Burst[] = [];
		let mouseX = -9999;
		let mouseY = -9999;
		let prevMouseX = -9999;
		let prevMouseY = -9999;
		let mouseActive = false;
		let running = true;
		let lastT = performance.now();
		let time = 0;
		let nextMeteorAt = 1.2;
		let ambientPulse = 0;
		let isDark = document.documentElement.classList.contains('dark');
		/** Phones / coarse pointers: fewer particles, no click bursts, lighter draw path */
		const liteMq = window.matchMedia('(max-width: 1023px), (pointer: coarse), (hover: none)');
		let isLite = liteMq.matches;
		const onLite = () => {
			isLite = liteMq.matches;
			rebuildParticles();
		};
		liteMq.addEventListener('change', onLite);

		const lightPalette = [
			{ hue: 8, sat: 82, light: 58 },
			{ hue: 12, sat: 78, light: 62 },
			{ hue: 18, sat: 75, light: 60 },
			{ hue: 28, sat: 70, light: 58 },
			{ hue: 350, sat: 72, light: 62 },
			{ hue: 38, sat: 68, light: 64 },
			{ hue: 0, sat: 0, light: 96 },
			{ hue: 340, sat: 55, light: 72 }
		];

		const darkPalette = [
			{ hue: 8, sat: 90, light: 68 },
			{ hue: 14, sat: 88, light: 72 },
			{ hue: 28, sat: 85, light: 70 },
			{ hue: 38, sat: 80, light: 72 },
			{ hue: 350, sat: 78, light: 74 },
			{ hue: 45, sat: 90, light: 78 },
			{ hue: 0, sat: 0, light: 98 },
			{ hue: 200, sat: 40, light: 78 }
		];

		function brandPalette() {
			return isDark ? darkPalette : lightPalette;
		}

		function pickColor() {
			const palette = brandPalette();
			return palette[Math.floor(Math.random() * palette.length)];
		}

		function onThemeChange() {
			isDark = document.documentElement.classList.contains('dark');
		}

		const themeObserver = new MutationObserver(onThemeChange);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class', 'data-theme']
		});

		function countsForViewport() {
			if (isLite) {
				// Keep ambience without competing with UI interactions on mobile
				return { dust: 18, glow: 4, spark: 8, star: 4, ring: 2, petal: 4 };
			}
			const area = w * h;
			if (area < 500_000) {
				return { dust: 36, glow: 10, spark: 18, star: 10, ring: 6, petal: 12 };
			}
			if (area < 1_200_000) {
				return { dust: 70, glow: 18, spark: 34, star: 18, ring: 10, petal: 22 };
			}
			return { dust: 100, glow: 26, spark: 48, star: 26, ring: 14, petal: 32 };
		}

		function spawnKind(kind: Kind, p?: Partial<Particle>): Particle {
			const c = pickColor();
			const depth = 0.25 + Math.random() * 0.75;
			const baseByKind: Record<Kind, number> = {
				dust: 0.6 + Math.random() * 1.4,
				glow: 3 + Math.random() * 7,
				spark: 0.8 + Math.random() * 1.6,
				star: 1.6 + Math.random() * 2.8,
				ring: 2.5 + Math.random() * 5,
				petal: 1.2 + Math.random() * 2.4
			};
			const opacityByKind: Record<Kind, number> = {
				dust: 0.28 + Math.random() * 0.45,
				glow: 0.1 + Math.random() * 0.16,
				spark: 0.45 + Math.random() * 0.45,
				star: 0.35 + Math.random() * 0.45,
				ring: 0.12 + Math.random() * 0.2,
				petal: 0.22 + Math.random() * 0.35
			};
			const drift = 0.12 + depth * 0.35;
			return {
				x: Math.random() * w,
				y: Math.random() * h,
				vx: (Math.random() - 0.5) * drift,
				vy: -(0.04 + Math.random() * 0.22) * depth,
				r: baseByKind[kind] * (0.6 + depth * 0.6),
				baseR: baseByKind[kind] * (0.6 + depth * 0.6),
				baseOpacity: opacityByKind[kind],
				hue: c.hue,
				sat: c.sat,
				light: c.light,
				phase: Math.random() * Math.PI * 2,
				speed: 0.35 + Math.random() * 1.2,
				kind,
				spin: Math.random() * Math.PI * 2,
				spinV: (Math.random() - 0.5) * 0.04,
				life: 1,
				maxLife: 1,
				depth,
				trail: kind === 'spark' && Math.random() < 0.35,
				...p
			};
		}

		function rebuildParticles() {
			const c = countsForViewport();
			const list: Particle[] = [];
			const pushN = (kind: Kind, n: number) => {
				for (let i = 0; i < n; i++) list.push(spawnKind(kind));
			};
			pushN('dust', c.dust);
			pushN('glow', c.glow);
			pushN('spark', c.spark);
			pushN('star', c.star);
			pushN('ring', c.ring);
			pushN('petal', c.petal);
			particles = list;
		}

		function spawnMeteor() {
			const fromLeft = Math.random() < 0.5;
			const y = Math.random() * h * 0.55;
			const speed = 6 + Math.random() * 9;
			const ang = 0.32 + Math.random() * 0.22;
			meteors.push({
				x: fromLeft ? -40 : w + 40,
				y,
				vx: (fromLeft ? 1 : -1) * Math.cos(ang) * speed,
				vy: Math.sin(ang) * speed,
				len: 50 + Math.random() * 90,
				life: 1,
				maxLife: 1,
				hue: brandPalette()[Math.floor(Math.random() * 5)].hue,
				width: 1.2 + Math.random() * 1.6
			});
		}

		function spawnBurst(x: number, y: number, count = 14) {
			for (let i = 0; i < count; i++) {
				const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
				const sp = 1.2 + Math.random() * 3.5;
				const c = pickColor();
				bursts.push({
					x,
					y,
					vx: Math.cos(ang) * sp,
					vy: Math.sin(ang) * sp,
					r: 1 + Math.random() * 2.2,
					life: 1,
					maxLife: 0.45 + Math.random() * 0.55,
					hue: c.hue
				});
			}
		}

		function resize() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			if (!canvas) return;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (particles.length === 0) rebuildParticles();
			else {
				// soft rebalance without full reset
				const target = Object.values(countsForViewport()).reduce((a, b) => a + b, 0);
				if (Math.abs(particles.length - target) > 20) rebuildParticles();
			}
		}

		function onPointer(e: PointerEvent) {
			// Touch / mobile: don't track pointer for trails or attract (avoids jank while scrolling / tapping nav)
			if (isLite || e.pointerType === 'touch') {
				mouseActive = false;
				return;
			}
			prevMouseX = mouseX;
			prevMouseY = mouseY;
			mouseX = e.clientX;
			mouseY = e.clientY;
			mouseActive = true;

			// mouse trail sparks (desktop only)
			if (prevMouseX > -1000) {
				const dx = mouseX - prevMouseX;
				const dy = mouseY - prevMouseY;
				const dist = Math.hypot(dx, dy);
				if (dist > 6 && bursts.length < 80) {
					const steps = Math.min(3, Math.floor(dist / 14));
					for (let i = 0; i < steps; i++) {
						const t = (i + 1) / (steps + 1);
						const c = pickColor();
						bursts.push({
							x: prevMouseX + dx * t + (Math.random() - 0.5) * 6,
							y: prevMouseY + dy * t + (Math.random() - 0.5) * 6,
							vx: (Math.random() - 0.5) * 0.8,
							vy: -0.4 - Math.random() * 1.2,
							r: 0.8 + Math.random() * 1.6,
							life: 1,
							maxLife: 0.35 + Math.random() * 0.4,
							hue: c.hue
						});
					}
				}
			}
		}

		function onLeave() {
			mouseX = -9999;
			mouseY = -9999;
			mouseActive = false;
		}

		function onClick(e: PointerEvent) {
			// Never steal frame budget from UI chrome (header, menus, buttons, links, forms)
			if (isLite || e.pointerType === 'touch') return;
			const t = e.target;
			if (t instanceof Element) {
				if (
					t.closest(
						'a, button, input, textarea, select, label, summary, [role="button"], [role="menuitem"], .site-header, header, nav, .site-float, .site-back-top, .site-line'
					)
				) {
					return;
				}
			}
			spawnBurst(e.clientX, e.clientY, 12 + Math.floor(Math.random() * 8));
		}

		function onVisibility() {
			running = document.visibilityState === 'visible';
			if (running) {
				lastT = performance.now();
				raf = requestAnimationFrame(frame);
			}
		}

		function drawStar(cx: number, cy: number, spikes: number, outer: number, inner: number, rot: number) {
			ctx.beginPath();
			for (let i = 0; i < spikes * 2; i++) {
				const r = i % 2 === 0 ? outer : inner;
				const a = rot + (i * Math.PI) / spikes;
				const x = cx + Math.cos(a) * r;
				const y = cy + Math.sin(a) * r;
				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
		}

		function wrap(p: Particle) {
			const pad = 30;
			if (p.y < -pad) {
				p.y = h + pad;
				p.x = Math.random() * w;
			}
			if (p.y > h + pad) p.y = -pad;
			if (p.x < -pad) p.x = w + pad;
			if (p.x > w + pad) p.x = -pad;
		}

		function frame(t: number) {
			if (!running || !ctx) return;
			const dt = Math.min(32, t - lastT) / 16.67;
			lastT = t;
			time += dt * 0.016;
			ambientPulse = 0.5 + 0.5 * Math.sin(time * 0.7);

			ctx.clearRect(0, 0, w, h);

			// —— layered ambient washes ——
			const washA = isDark ? 0.09 + ambientPulse * 0.04 : 0.045 + ambientPulse * 0.02;
			const washB = isDark ? 0.07 + (1 - ambientPulse) * 0.03 : 0.03 + (1 - ambientPulse) * 0.02;
			const g1 = ctx.createRadialGradient(
				w * (0.3 + 0.05 * Math.sin(time * 0.3)),
				h * 0.2,
				0,
				w * 0.35,
				h * 0.25,
				Math.max(w, h) * 0.55
			);
			g1.addColorStop(0, `rgba(229, 85, 74, ${washA})`);
			g1.addColorStop(1, 'rgba(229, 85, 74, 0)');
			ctx.fillStyle = g1;
			ctx.fillRect(0, 0, w, h);

			const g2 = ctx.createRadialGradient(
				w * (0.75 + 0.04 * Math.cos(time * 0.25)),
				h * 0.65,
				0,
				w * 0.75,
				h * 0.65,
				Math.max(w, h) * 0.45
			);
			g2.addColorStop(0, `rgba(232, 160, 90, ${washB})`);
			g2.addColorStop(1, 'rgba(232, 160, 90, 0)');
			ctx.fillStyle = g2;
			ctx.fillRect(0, 0, w, h);

			// soft floating orbs (desktop only — gradients are costly on mobile GPUs)
			if (!isLite) {
				const orbAlpha = isDark ? 0.1 : 0.05;
				for (let i = 0; i < 4; i++) {
					const ox = w * (0.15 + i * 0.22) + Math.sin(time * 0.2 + i) * 40;
					const oy = h * (0.25 + (i % 3) * 0.22) + Math.cos(time * 0.18 + i * 1.3) * 30;
					const or = 40 + i * 18 + ambientPulse * 12;
					const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
					og.addColorStop(0, `hsla(${8 + i * 8}, 80%, ${isDark ? 68 : 60}%, ${orbAlpha})`);
					og.addColorStop(1, 'hsla(10, 80%, 60%, 0)');
					ctx.beginPath();
					ctx.fillStyle = og;
					ctx.arc(ox, oy, or, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			// —— connection mesh (skip / lighten on mobile) ——
			if (!isLite) {
				const linkDist = Math.min(150, w * 0.12);
				const linkDist2 = linkDist * linkDist;
				const mesh = particles.filter((p) => p.kind === 'dust' || p.kind === 'spark');
				const meshCap = Math.min(mesh.length, 70);
				for (let i = 0; i < meshCap; i++) {
					const a = mesh[i];
					for (let j = i + 1; j < meshCap; j++) {
						const b = mesh[j];
						const dx = a.x - b.x;
						const dy = a.y - b.y;
						const d2 = dx * dx + dy * dy;
						if (d2 < linkDist2) {
							const linkMul = isDark ? 0.22 : 0.14;
							const alpha =
								(1 - Math.sqrt(d2) / linkDist) * linkMul * Math.min(a.depth, b.depth);
							ctx.beginPath();
							ctx.strokeStyle = `hsla(12, 78%, ${isDark ? 70 : 58}%, ${alpha})`;
							ctx.lineWidth = 0.65;
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.stroke();
						}
					}
				}
			}

			// mouse radial links
			if (mouseActive) {
				const mLink = 160;
				const mLink2 = mLink * mLink;
				for (let i = 0; i < Math.min(particles.length, 90); i++) {
					const p = particles[i];
					const dx = p.x - mouseX;
					const dy = p.y - mouseY;
					const d2 = dx * dx + dy * dy;
					if (d2 < mLink2) {
						const alpha = (1 - Math.sqrt(d2) / mLink) * 0.22;
						ctx.beginPath();
						ctx.strokeStyle = `hsla(14, 85%, 62%, ${alpha})`;
						ctx.lineWidth = 0.8;
						ctx.moveTo(mouseX, mouseY);
						ctx.lineTo(p.x, p.y);
						ctx.stroke();
					}
				}
				// cursor glow
				const cg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 80);
				cg.addColorStop(0, 'rgba(229, 85, 74, 0.12)');
				cg.addColorStop(0.5, 'rgba(229, 85, 74, 0.04)');
				cg.addColorStop(1, 'rgba(229, 85, 74, 0)');
				ctx.fillStyle = cg;
				ctx.beginPath();
				ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2);
				ctx.fill();
			}

			// —— particles ——
			for (const p of particles) {
				p.phase += 0.014 * p.speed * dt;
				p.spin += p.spinV * dt;
				const sway = Math.sin(p.phase) * 0.22 * p.depth;
				const bob = Math.cos(p.phase * 0.7) * 0.08;
				p.x += (p.vx + sway) * dt;
				p.y += (p.vy + bob) * dt;

				// mouse soft attract + swirl for near particles
				if (mouseActive) {
					const mdx = mouseX - p.x;
					const mdy = mouseY - p.y;
					const md2 = mdx * mdx + mdy * mdy;
					if (md2 < 22000 && md2 > 4) {
						const d = Math.sqrt(md2);
						const pull = (0.012 * p.depth) / (d * 0.02 + 1);
						p.x += mdx * pull * dt;
						p.y += mdy * pull * dt;
						// tangential swirl
						p.x += (-mdy / d) * 0.35 * p.depth * dt;
						p.y += (mdx / d) * 0.35 * p.depth * dt;
					}
				}

				wrap(p);

				const pulse = 0.55 + 0.45 * Math.sin(p.phase * 1.6 + p.depth);
				const twinkle =
					p.kind === 'spark' || p.kind === 'star'
						? 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(p.phase * 3.2), 3)
						: 1;
				const themeBoost = isDark ? 1.35 : 1;
				const op = Math.min(1, p.baseOpacity * (0.65 + pulse * 0.4) * twinkle * themeBoost);
				const r = p.baseR * (0.8 + pulse * 0.35);

				switch (p.kind) {
					case 'glow': {
						const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5);
						grd.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op * 0.95})`);
						grd.addColorStop(0.4, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op * 0.28})`);
						grd.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`);
						ctx.beginPath();
						ctx.fillStyle = grd;
						ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2);
						ctx.fill();
						break;
					}
					case 'star': {
						ctx.save();
						if (!isLite) {
							ctx.shadowColor = `hsla(${p.hue}, ${p.sat}%, ${p.light + 10}%, ${op * 0.7})`;
							ctx.shadowBlur = 8;
						}
						drawStar(p.x, p.y, 4, r * 1.4, r * 0.45, p.spin);
						ctx.fillStyle = `hsla(${p.hue}, ${Math.max(p.sat - 10, 20)}%, ${Math.min(p.light + 15, 92)}%, ${op})`;
						ctx.fill();
						ctx.restore();
						if (!isLite) {
							// cross flare
							ctx.strokeStyle = `hsla(${p.hue}, 70%, 90%, ${op * 0.55})`;
							ctx.lineWidth = 0.7;
							ctx.beginPath();
							ctx.moveTo(p.x - r * 2.2, p.y);
							ctx.lineTo(p.x + r * 2.2, p.y);
							ctx.moveTo(p.x, p.y - r * 2.2);
							ctx.lineTo(p.x, p.y + r * 2.2);
							ctx.stroke();
						}
						break;
					}
					case 'ring': {
						ctx.beginPath();
						ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op})`;
						ctx.lineWidth = 1 + p.depth;
						ctx.arc(p.x, p.y, r * (1.1 + 0.2 * pulse), 0, Math.PI * 2);
						ctx.stroke();
						ctx.beginPath();
						ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op * 0.25})`;
						ctx.arc(p.x, p.y, r * 0.35, 0, Math.PI * 2);
						ctx.fill();
						break;
					}
					case 'petal': {
						ctx.save();
						ctx.translate(p.x, p.y);
						ctx.rotate(p.spin);
						ctx.beginPath();
						ctx.ellipse(0, 0, r * 0.55, r * 1.15, 0, 0, Math.PI * 2);
						ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op * 0.85})`;
						ctx.fill();
						ctx.rotate(Math.PI / 2.5);
						ctx.beginPath();
						ctx.ellipse(0, 0, r * 0.4, r * 0.9, 0, 0, Math.PI * 2);
						ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${Math.min(p.light + 8, 90)}%, ${op * 0.55})`;
						ctx.fill();
						ctx.restore();
						break;
					}
					case 'spark': {
						// diamond spark
						ctx.save();
						ctx.translate(p.x, p.y);
						ctx.rotate(p.spin);
						ctx.beginPath();
						ctx.moveTo(0, -r * 1.8);
						ctx.lineTo(r * 0.7, 0);
						ctx.lineTo(0, r * 1.8);
						ctx.lineTo(-r * 0.7, 0);
						ctx.closePath();
						ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${Math.min(p.light + 20, 95)}%, ${op})`;
						if (!isLite) {
							ctx.shadowColor = `hsla(${p.hue}, 90%, 70%, ${op * 0.8})`;
							ctx.shadowBlur = 6;
						}
						ctx.fill();
						ctx.restore();
						if (p.trail && !isLite) {
							ctx.beginPath();
							ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op * 0.25})`;
							ctx.lineWidth = 1;
							ctx.moveTo(p.x, p.y);
							ctx.lineTo(p.x - p.vx * 12, p.y - p.vy * 18);
							ctx.stroke();
						}
						break;
					}
					default: {
						// dust
						ctx.beginPath();
						ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${op})`;
						ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
						ctx.fill();
						ctx.beginPath();
						ctx.fillStyle = `hsla(${p.hue}, 90%, 94%, ${op * 0.5})`;
						ctx.arc(p.x - r * 0.28, p.y - r * 0.28, r * 0.32, 0, Math.PI * 2);
						ctx.fill();
					}
				}
			}

			// —— meteors ——
			if (!isLite && time > nextMeteorAt && meteors.length < 3) {
				spawnMeteor();
				nextMeteorAt = time + 2.5 + Math.random() * 4.5;
			}
			for (let i = meteors.length - 1; i >= 0; i--) {
				const m = meteors[i];
				m.x += m.vx * dt;
				m.y += m.vy * dt;
				m.life -= 0.008 * dt;
				const ang = Math.atan2(m.vy, m.vx);
				const op = Math.max(0, m.life) * 0.9;
				const tx = m.x - Math.cos(ang) * m.len;
				const ty = m.y - Math.sin(ang) * m.len;
				const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
				grad.addColorStop(0, `hsla(${m.hue}, 90%, 75%, ${op})`);
				grad.addColorStop(0.35, `hsla(${m.hue}, 85%, 60%, ${op * 0.55})`);
				grad.addColorStop(1, `hsla(${m.hue}, 80%, 55%, 0)`);
				ctx.beginPath();
				ctx.strokeStyle = grad;
				ctx.lineWidth = m.width;
				ctx.lineCap = 'round';
				ctx.moveTo(m.x, m.y);
				ctx.lineTo(tx, ty);
				ctx.stroke();
				// head glow
				const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 8);
				hg.addColorStop(0, `hsla(${m.hue}, 95%, 90%, ${op})`);
				hg.addColorStop(1, `hsla(${m.hue}, 90%, 60%, 0)`);
				ctx.fillStyle = hg;
				ctx.beginPath();
				ctx.arc(m.x, m.y, 8, 0, Math.PI * 2);
				ctx.fill();

				if (m.life <= 0 || m.x < -120 || m.x > w + 120 || m.y > h + 80) {
					meteors.splice(i, 1);
				}
			}

			// —— burst sparks ——
			for (let i = bursts.length - 1; i >= 0; i--) {
				const b = bursts[i];
				b.x += b.vx * dt;
				b.y += b.vy * dt;
				b.vy += 0.04 * dt; // gravity
				b.vx *= 0.99;
				b.life -= dt / (b.maxLife * 60);
				const op = Math.max(0, b.life);
				const pr = b.r * (0.5 + op * 0.7);
				ctx.beginPath();
				ctx.fillStyle = `hsla(${b.hue}, 85%, 65%, ${op * 0.9})`;
				ctx.arc(b.x, b.y, pr, 0, Math.PI * 2);
				ctx.fill();
				// mini cross
				if (op > 0.4) {
					ctx.strokeStyle = `hsla(${b.hue}, 80%, 88%, ${op * 0.6})`;
					ctx.lineWidth = 0.6;
					ctx.beginPath();
					ctx.moveTo(b.x - pr * 1.6, b.y);
					ctx.lineTo(b.x + pr * 1.6, b.y);
					ctx.moveTo(b.x, b.y - pr * 1.6);
					ctx.lineTo(b.x, b.y + pr * 1.6);
					ctx.stroke();
				}
				if (b.life <= 0) bursts.splice(i, 1);
			}

			// occasional ambient sparkle pop (desktop only)
			if (!isLite && Math.random() < 0.03 && bursts.length < 80) {
				spawnBurst(Math.random() * w, Math.random() * h, 5 + Math.floor(Math.random() * 6));
			}

			raf = requestAnimationFrame(frame);
		}

		resize();
		window.addEventListener('resize', resize, { passive: true });
		window.addEventListener('pointermove', onPointer, { passive: true });
		window.addEventListener('pointerleave', onLeave, { passive: true });
		window.addEventListener('pointerdown', onClick, { passive: true });
		document.addEventListener('visibilitychange', onVisibility);
		raf = requestAnimationFrame(frame);

		return () => {
			running = false;
			cancelAnimationFrame(raf);
			themeObserver.disconnect();
			liteMq.removeEventListener('change', onLite);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', onPointer);
			window.removeEventListener('pointerleave', onLeave);
			window.removeEventListener('pointerdown', onClick);
			document.removeEventListener('visibilitychange', onVisibility);
			mq.removeEventListener('change', onMq);
		};
	});
</script>

{#if !reduced}
	<canvas
		bind:this={canvas}
		class="particle-field pointer-events-none fixed inset-0 z-[40]"
		aria-hidden="true"
	></canvas>
{/if}

<style>
	.particle-field {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.particle-field {
			display: none;
		}
	}
</style>
