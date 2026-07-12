export const ASSET_BASE = 'https://www.wdmc.tw/assets/images/';
export const LOCAL_ASSET_BASE = '/images/';

export function asset(name: string, local = false): string {
	return (local ? LOCAL_ASSET_BASE : ASSET_BASE) + name;
}

/** Non-translatable site metadata. Display copy lives in i18n/content. */
export const site = {
	phone: "04-24620612",
	phone2: "04-24620613",
	fax: "04-24620607",
	email: "michael@wdmc.com.tw",
	facebook: "https://www.facebook.com/WDMC2012/",
	youtube: "https://www.youtube.com/channel/UC6BbsjZg4rtd9ICS3zcswlQ/",
	line: "https://line.me/R/ti/p/%40jnm8962d",
	lineOfficial: "https://lin.ee/xvPjfDX",
	maps: "https://goo.gl/maps/pWCX2JpmBzaJeFK6A"
};

export type NavItem = { key: string; href: string; children?: NavItem[] };

export const navItems: NavItem[] = [
	{ key: 'about', href: '/about' },
	{ key: 'news', href: '/news' },
	{
		key: 'services',
		href: '/#services',
		children: [
			{ key: 'wdmc', href: '/wdmc' },
			{ key: 'opening', href: '/opening' },
			{ key: 'active', href: '/active' }
		]
	},
	{ key: 'activity', href: '/activity' },
	{ key: 'kids', href: '/kids' },
	{ key: 'talent', href: '/talent' },
	{ key: 'community', href: '/community' },
	{ key: 'contact', href: '/contact' },
	{ key: 'staff', href: '/staff' }
];

export const home = {
	banners: [
		{ src: asset('index-banner1.jpg', true) },
		{ src: asset('index-banner2.jpg', true) }
	],
	brands: [
		{ logo: 'logo-wd.jpg', href: '/wdmc' },
		{ logo: 'logo-sj.jpg', href: '/activity' },
		{ logo: 'logo-bk.jpg', href: '/kids' },
		{ logo: 'logo-wd.jpg', href: '/talent' }
	],
	marketing: {
		items: [
			{ icon: 'index-deco5.png' },
			{ icon: 'index-deco6.png' },
			{ icon: 'index-deco5.png' },
			{ icon: 'index-deco6.png' },
			{ icon: 'index-deco5.png' },
			{ icon: 'index-deco6.png' }
		],
		overlay: { src: asset('index-overlay.jpg') }
	},
	featured: {
		items: [
			{ src: asset('index-act1.jpg'), href: '/wdmc' },
			{ src: asset('index-act2.jpg'), href: '/wdmc' },
			{ src: asset('index-act3.jpg'), href: '/wdmc' },
			{ src: asset('index-act4.jpg'), href: '/wdmc' },
			{ src: asset('index-act5.jpg'), href: '/wdmc' },
			{ src: asset('index-act6.jpg'), href: '/wdmc' },
			{ src: asset('index-act7.jpg'), href: '/wdmc' },
			{ src: asset('index-act8.jpg'), href: '/wdmc' },
			{ src: asset('index-act9.jpg'), href: '/wdmc' },
			{ src: asset('index-act10.jpg'), href: '/wdmc' },
			{ src: asset('index-act11.jpg'), href: '/wdmc' },
			{ src: asset('index-act12.jpg'), href: '/wdmc' }
		]
	},
	media: {
		items: [
			{ icon: 'index-mark1.png' },
			{ icon: 'index-mark2.png' },
			{ icon: 'index-mark3.png' },
			{ icon: 'index-mark4.png' },
			{ icon: 'index-mark5.png' },
			{ icon: 'index-mark8.png' }
		]
	},
	kids: {
		booking: "https://www.facebook.com/BabyKids201907/",
		image: { src: asset('index-kid1.jpg') }
	},
	clips: {
		items: [
			{ src: asset('index-cut1.jpg') },
			{ src: asset('index-cut2.jpg') },
			{ src: asset('index-cut3.jpg') },
			{ src: asset('index-cut4.jpg') }
		]
	}
};

export const about = {
	banner: { src: asset('about-banner.jpg', true) },
	features: [
		{ icon: 'about-icon1.png' },
		{ icon: 'about-icon2.png' },
		{ icon: 'about-icon3.png' },
		{ icon: 'about-icon4.png' }
	],
	team: [
		{ image: 'about-member1.jpg', email: "michael@wdmc.com.tw", ext: "04-24620612" },
		{ image: 'about-member-11404.jpg', email: "", ext: "04-24620612 #25" },
		{ image: 'about-member-11405.jpg', email: "", ext: "04-24620612 #10" },
		{ image: 'about-member-11407.jpg', email: "", ext: "04-24620612 #27" },
		{ image: 'about-member-11408.jpg', email: "", ext: "04-24620612 #29" },
		{ image: 'about-member-11401.jpg', email: "", ext: "04-24620612 #23" },
		{ image: 'about-member31.jpg', email: "", ext: "04-24620612 #22" },
		{ image: 'about-member-11409.jpg', email: "", ext: "04-24620612 #14" },
		{ image: 'about-member5.jpg', email: "", ext: "04-24620612 #13" },
		{ image: 'about-member-11402.jpg', email: "", ext: "04-24620612 #12" },
		{ image: 'about-member-11403.jpg', email: "", ext: "04-24620612 #11" },
		{ image: 'about-member10.jpg', email: "", ext: "" },
		{ image: 'about-member-11410.jpg', email: "", ext: "" },
		{ image: 'about-member-11411.jpg', email: "", ext: "" },
		{ image: 'about-member25.jpg', email: "", ext: "" },
		{ image: 'about-member33.jpg', email: "", ext: "" },
		{ image: 'about-member34.jpg', email: "", ext: "" },
		{ image: 'about-member20.jpg', email: "", ext: "" }
	],
	environment: {
		images: ["about-env1-1.jpg","about-env1-2.jpg","about-env1-3.jpg","about-env1-4.jpg","about-env2-1.jpg","about-env2-2.jpg","about-env2-3.jpg","about-env2-4.jpg","about-env3-1.jpg","about-env3-2.jpg","about-env3-3.jpg","about-env3-4.jpg","about-env4-1.jpg","about-env4-2.jpg","about-env4-3.jpg","about-env4-4.jpg"]
	}
};

export const services = {
	kids: {
		booking: home.kids.booking,
		image: home.kids.image
	},
	opening: {
		banner: { src: asset('opening-banner.png', true) },
		aboutImage: asset('active-about.jpg'),
		gallery: Array.from({ length: 10 }, (_, i) => `opening-slide-${i + 1}.jpg`)
	},
	active: {
		banners: [
			{ src: asset('active-banner.jpg', true) },
			{ src: asset('active-banner2.jpg') }
		],
		aboutImage: asset('active-about.jpg'),
		performance: Array.from({ length: 16 }, (_, i) => `active-performance-${i + 1}.jpg`),
		special: ['active-special-1.jpg', 'active-special-2.jpg', 'active-special-3.jpg', 'active-special-4.jpg']
	},
	community: {
		gallery: Array.from({ length: 16 }, (_, i) => `active-performance-${i + 1}.jpg`)
	}
};

export const news = {
	banners: [
		{ src: asset('news-banner1.jpg', true) },
		{ src: asset('news-banner2.jpg', true) },
		{ src: asset('news-banner3.jpg', true) },
		{ src: asset('news-banner4.jpg', true) }
	],
	items: [
		{ id: 'news223', image: 'news-act223.jpg', year: '2025' },
		{ id: 'news222', image: 'news-act222.jpg', year: '2025' },
		{ id: 'news221', image: 'news-act221.jpg', year: '2025' },
		{ id: 'news220', image: 'news-act220.jpg', year: '2025' },
		{ id: 'news219', image: 'news-act219.jpg', year: '2025' },
		{ id: 'news218', image: 'news-act218.jpg', year: '2025' },
		{ id: 'news217', image: 'news-act217.jpg', year: '2025' },
		{ id: 'news216', image: 'news-act216.jpg', year: '2025' },
		{ id: 'news213', image: 'news-act213.jpg', year: '2025' },
		{ id: 'news212', image: 'news-act212.jpg', year: '2025' },
		{ id: 'news211', image: 'news-act211.jpg', year: '2025' },
		{ id: 'news209', image: 'news-act209.jpg', year: '2025' },
		{ id: 'news208', image: 'news-act208.jpg', year: '2025' },
		{ id: 'news207', image: 'news-act207.jpg', year: '2025' },
		{ id: 'news205', image: 'news-act205.jpg', year: '2025' },
		{ id: 'news204', image: 'news-act204.jpg', year: '2025' },
		{ id: 'news202', image: 'news-act202.jpg', year: '2025' },
		{ id: 'news201', image: 'news-act201.jpg', year: '2025' },
		{ id: 'news200', image: 'news-act200.jpg', year: '2025' },
		{ id: 'news199', image: 'news-act199.jpg', year: '2024' },
		{ id: 'news198', image: 'news-act198.jpg', year: '2024' },
		{ id: 'news197', image: 'news-act197.jpg', year: '2024' },
		{ id: 'news195', image: 'news-act195.jpg', year: '2024' },
		{ id: 'news193', image: 'news-act193.jpg', year: '2024' },
		{ id: 'news191', image: 'news-act191.jpg', year: '2024' },
		{ id: 'news189', image: 'news-act189.jpg', year: '2024' },
		{ id: 'news187', image: 'news-act187.jpg', year: '2024' },
		{ id: 'news184', image: 'news-act18.jpg', year: '2024' },
		{ id: 'news182', image: 'news-act182.jpg', year: '2024' },
		{ id: 'news181', image: 'news-act181.jpg', year: '2024' },
		{ id: 'news180', image: 'news-act180.jpg', year: '2024' },
		{ id: 'news179', image: 'news-act179.jpg', year: '2024' },
		{ id: 'news177', image: 'news-act177.jpg', year: '2024' },
		{ id: 'news176', image: 'news-act176.jpg', year: '2024' },
		{ id: 'news174', image: 'news-act174.jpg', year: '2024' },
		{ id: 'news171', image: 'news-act171.jpg', year: '2024' },
		{ id: 'news168', image: 'news-act168.jpg', year: '2024' },
		{ id: 'news166', image: 'news-act166.jpg', year: '2024' },
		{ id: 'news165', image: 'news-act165.jpg', year: '2024' },
		{ id: 'news164', image: 'news-act164.jpg', year: '2024' },
		{ id: 'news163', image: 'news-act163.jpg', year: '2024' },
		{ id: 'news162', image: 'news-act162.jpg', year: '2024' },
		{ id: 'news161', image: 'news-act161.jpg', year: '2024' },
		{ id: 'news160', image: 'news-act160.jpg', year: '2024' },
		{ id: 'news159', image: 'news-act159.jpg', year: '2024' },
		{ id: 'news158', image: 'news-act158.jpg', year: '2024' },
		{ id: 'news157', image: 'news-act157.jpg', year: '2024' },
		{ id: 'news156', image: 'news-act156.jpg', year: '2024' },
		{ id: 'news155', image: 'news-act156.jpg', year: '2024' },
		{ id: 'news153', image: 'news-act153.jpg', year: '2024' },
		{ id: 'news152', image: 'news-act152.jpg', year: '2024' },
		{ id: 'news151', image: 'news-act151.jpg', year: '2024' },
		{ id: 'news150', image: 'news-act150.jpg', year: '2024' },
		{ id: 'news149', image: 'news-act149.jpg', year: '2024' },
		{ id: 'news148', image: 'news-act148.jpg', year: '2024' },
		{ id: 'news147', image: 'news-act147.jpg', year: '2024' },
		{ id: 'news146', image: 'news-act146.jpg', year: '2024' },
		{ id: 'news145', image: 'news-act145.jpg', year: '2024' },
		{ id: 'news144', image: 'news-act144.jpg', year: '2024' },
		{ id: 'news143', image: 'news-act143.jpg', year: '2024' },
		{ id: 'news142', image: 'news-act142.jpg', year: '2024' },
		{ id: 'news141', image: 'news-act141.jpg', year: '2024' },
		{ id: 'news140', image: 'news-act140.jpg', year: '2024' },
		{ id: 'news139', image: 'news-act139.jpg', year: '2024' },
		{ id: 'news138', image: 'news-act138.jpg', year: '2024' },
		{ id: 'news137', image: 'news-act137.jpg', year: '2024' },
		{ id: 'news136', image: 'news-act136.jpg', year: '2024' },
		{ id: 'news135', image: 'news-act135.jpg', year: '2024' },
		{ id: 'news134', image: 'news-act134.jpg', year: '2024' },
		{ id: 'news133', image: 'news-act133.jpg', year: '2024' },
		{ id: 'news132', image: 'news-act132.jpg', year: '2024' },
		{ id: 'news131', image: 'news-act131.jpg', year: '2024' },
		{ id: 'news130', image: 'news-act130.jpg', year: '2024' },
		{ id: 'news129', image: 'news-act129.jpg', year: '2024' },
		{ id: 'news128', image: 'news-act128.jpg', year: '2024' },
		{ id: 'news127', image: 'news-act127.jpg', year: '2023' },
		{ id: 'news126', image: 'news-act126.jpg', year: '2023' },
		{ id: 'news125', image: 'news-act125.jpg', year: '2023' },
		{ id: 'news124', image: 'news-act124.jpg', year: '2023' },
		{ id: 'news123', image: 'news-act123.jpg', year: '2023' },
		{ id: 'news122', image: 'news-act122.jpg', year: '2023' },
		{ id: 'news121', image: 'news-act121.jpg', year: '2023' },
		{ id: 'news120', image: 'news-act120.jpg', year: '2023' },
		{ id: 'news119', image: 'news-act119.jpg', year: '2023' },
		{ id: 'news118', image: 'news-act118.jpg', year: '2023' },
		{ id: 'news117', image: 'news-act117.jpg', year: '2023' },
		{ id: 'news116', image: 'news-act116.jpg', year: '2023' },
		{ id: 'news115', image: 'news-act115.jpg', year: '2023' },
		{ id: 'news114', image: 'news-act114.jpg', year: '2023' },
		{ id: 'news113', image: 'news-act113.jpg', year: '2023' },
		{ id: 'news112', image: 'news-act112.jpg', year: '2023' },
		{ id: 'news111', image: 'news-act111.jpg', year: '2023' },
		{ id: 'news110', image: 'news-act110.jpg', year: '2023' },
		{ id: 'news109', image: 'news-act109.jpg', year: '2023' },
		{ id: 'news108', image: 'news-act108.jpg', year: '2023' },
		{ id: 'news107', image: 'news-act107.jpg', year: '2023' },
		{ id: 'news106', image: 'news-act106.jpg', year: '2023' },
		{ id: 'news105', image: 'news-act105.jpg', year: '2023' },
		{ id: 'news104', image: 'news-act104.jpg', year: '2023' },
		{ id: 'news103', image: 'news-act103.jpg', year: '2023' },
		{ id: 'news102', image: 'news-act102.jpg', year: '2023' },
		{ id: 'news101', image: 'news-act101.jpg', year: '2023' },
		{ id: 'news100', image: 'news-act100.jpg', year: '2023' },
		{ id: 'news99', image: 'news-act99.jpg', year: '2023' },
		{ id: 'news98', image: 'news-act98.jpg', year: '2023' },
		{ id: 'news97', image: 'news-act97.jpg', year: '2023' },
		{ id: 'news96', image: 'news-act96.jpg', year: '2023' },
		{ id: 'news95', image: 'news-act95.jpg', year: '2023' },
		{ id: 'news94', image: 'news-act94.jpg', year: '2023' },
		{ id: 'news93', image: 'news-act93.jpg', year: '2023' },
		{ id: 'news92', image: 'news-act92.jpg', year: '2023' },
		{ id: 'news91', image: 'news-act91.jpg', year: '2023' },
		{ id: 'news90', image: 'news-act90.jpg', year: '2023' },
		{ id: 'news89', image: 'news-act89.jpg', year: '2023' },
		{ id: 'news88', image: 'news-act88.jpg', year: '2023' },
		{ id: 'news87', image: 'news-act87.jpg', year: '2023' },
		{ id: 'news86', image: 'news-act86.jpg', year: '2023' },
		{ id: 'news85', image: 'news-act85.jpg', year: '2023' },
		{ id: 'news84', image: 'news-act84.jpg', year: '2023' },
		{ id: 'news83', image: 'news-act83.jpg', year: '2023' },
		{ id: 'news82', image: 'news-act82.jpg', year: '2023' },
		{ id: 'news80', image: 'news-act80.jpg', year: '2023' },
		{ id: 'news79', image: 'news-act79.jpg', year: '2023' },
		{ id: 'news78', image: 'news-act78.jpg', year: '2023' },
		{ id: 'news77', image: 'news-act77.jpg', year: '2023' },
		{ id: 'news76', image: 'news-act76.jpg', year: '2023' },
		{ id: 'news75', image: 'news-act75.jpg', year: '2023' },
		{ id: 'news74', image: 'news-act74.jpg', year: '2022' },
		{ id: 'news73', image: 'news-act73.jpg', year: '2022' },
		{ id: 'news72', image: 'news-act72.jpg', year: '2022' },
		{ id: 'news71', image: 'news-act71.jpg', year: '2022' },
		{ id: 'news70', image: 'news-act70.jpg', year: '2022' },
		{ id: 'news69', image: 'news-act69.jpg', year: '2022' },
		{ id: 'news68', image: 'news-act68.jpg', year: '2022' },
		{ id: 'news67', image: 'news-act67.jpg', year: '2022' },
		{ id: 'news66', image: 'news-act66.jpg', year: '2022' },
		{ id: 'news65', image: 'news-act65.jpg', year: '2022' },
		{ id: 'news64', image: 'news-act64.jpg', year: '2022' },
		{ id: 'news63', image: 'news-act63.jpg', year: '2022' },
		{ id: 'news62', image: 'news-act62.jpg', year: '2022' },
		{ id: 'news61', image: 'news-act61.jpg', year: '2022' },
		{ id: 'news60', image: 'news-act60.jpg', year: '2022' },
		{ id: 'news59', image: 'news-act59.jpg', year: '2022' },
		{ id: 'news58', image: 'news-act58.jpg', year: '2022' },
		{ id: 'news57', image: 'news-act57.jpg', year: '2022' },
		{ id: 'news56', image: 'news-act56.jpg', year: '2022' },
		{ id: 'news55', image: 'news-act55.jpg', year: '2022' },
		{ id: 'news54', image: 'news-act54.jpg', year: '2022' },
		{ id: 'news53', image: 'news-act53.jpg', year: '2022' },
		{ id: 'news52', image: 'news-act52.jpg', year: '2022' },
		{ id: 'news51', image: 'news-act51.jpg', year: '2022' },
		{ id: 'news50', image: 'news-act50.jpg', year: '2022' },
		{ id: 'news49', image: 'news-act49.jpg', year: '2022' },
		{ id: 'news48', image: 'news-act48.jpg', year: '2022' },
		{ id: 'news47', image: 'news-act47.jpg', year: '2022' },
		{ id: 'news46', image: 'news-act46.jpg', year: '2022' },
		{ id: 'news45', image: 'news-act45.jpg', year: '2022' },
		{ id: 'news44', image: 'news-act44.jpg', year: '2022' },
		{ id: 'news43', image: 'news-act43.jpg', year: '2022' },
		{ id: 'news42', image: 'news-act42.jpg', year: '2022' },
		{ id: 'news41', image: 'news-act41.jpg', year: '2022' },
		{ id: 'news40', image: 'news-act40.jpg', year: '2022' },
		{ id: 'news39', image: 'news-act39.jpg', year: '2022' },
		{ id: 'news38', image: 'news-act38.jpg', year: '2022' },
		{ id: 'news37', image: 'news-act37.jpg', year: '2022' },
		{ id: 'news36', image: 'news-act36.jpg', year: '2022' },
		{ id: 'news35', image: 'news-act35.jpg', year: '2022' },
		{ id: 'news34', image: 'news-act34.jpg', year: '2022' },
		{ id: 'news33', image: 'news-act33.jpg', year: '2022' },
		{ id: 'news32', image: 'news-act32.jpg', year: '2022' },
		{ id: 'news31', image: 'news-act31.jpg', year: '2022' },
		{ id: 'news30', image: 'news-act30.jpg', year: '2022' },
		{ id: 'news29', image: 'news-act29.jpg', year: '2022' },
		{ id: 'news28', image: 'news-act28.jpg', year: '2022' },
		{ id: 'news27', image: 'news-act27.jpg', year: '2022' },
		{ id: 'news26', image: 'news-act26.jpg', year: '2022' },
		{ id: 'news25', image: 'news-act25.jpg', year: '2022' },
		{ id: 'news24', image: 'news-act24.jpg', year: '2021' },
		{ id: 'news23', image: 'news-act23.jpg', year: '2021' },
		{ id: 'news22', image: 'news-act22.jpg', year: '2021' },
		{ id: 'news21', image: 'news-act21.jpg', year: '2021' },
		{ id: 'news20', image: 'news-act20.jpg', year: '2021' },
		{ id: 'news19', image: 'news-act19.jpg', year: '2021' },
		{ id: 'news18', image: 'news-act18.jpg', year: '2021' },
		{ id: 'news17', image: 'news-act17.jpg', year: '2021' },
		{ id: 'news16', image: 'news-act16.jpg', year: '2021' },
		{ id: 'news15', image: 'news-act15.jpg', year: '2021' },
		{ id: 'news14', image: 'news-act14.jpg', year: '2020' },
		{ id: 'news13', image: 'news-act13.jpg', year: '2020' },
		{ id: 'news12', image: 'news-act12.jpg', year: '2020' },
		{ id: 'news11', image: 'news-act11.jpg', year: '2020' },
		{ id: 'news10', image: 'news-act10.jpg', year: '2020' },
		{ id: 'news9', image: 'news-act9.jpg', year: '2020' },
		{ id: 'news8', image: 'news-act8.jpg', year: '2019' },
		{ id: 'news7', image: 'news-act7.jpg', year: '2019' },
		{ id: 'news6', image: 'news-act6.jpg', year: '2019' },
		{ id: 'news5', image: 'news-act5.jpg', year: '2019' },
		{ id: 'news4', image: 'news-act4.jpg', year: '2019' },
		{ id: 'news3', image: 'news-act3.jpg', year: '2018' },
		{ id: 'news2', image: 'news-act2.jpg', year: '2018' },
		{ id: 'news1', image: 'news-act1.jpg', year: '2018' }
	]
};

export const contact = {
	banner: { src: asset('contact-banner.jpg', true) },
	channels: [
		{ icon: 'contact-icon1.png', key: 'phone', local: true },
		{ icon: 'contact-icon2.png', key: 'address', local: true, hasMap: true },
		{ icon: 'contact-icon3.png', key: 'email', mailto: true, local: true },
		{ icon: 'contact-icon4.png', key: 'line', local: true, hasLine: true }
	]
};

export const staff = {
	banner: { src: asset('staff-banner.jpg', true) },
	form: "https://docs.google.com/forms/d/140TQG_CBtnVoXnuNAu_ZNkeCHtr5kQCTQUwaTqN05h0/edit?gxids=7757"
};
