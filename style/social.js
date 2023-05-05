// Respect user System animation preference
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let userAllowsAnimation = (!mediaQuery || mediaQuery.matches) ? false : true;
mediaQuery.addEventListener('change', () => {
	userAllowsAnimation = mediaQuery.matches ? false : true;
	setAnimationOption();
});
const toggle = document.querySelector('#toggle');
const setAnimationOption = () => {
	toggle.disabled = !userAllowsAnimation;
}
setAnimationOption();

// We are waiting for Star Wars "Visions" to arrive!!
let targetDate = 'September 22, 2021 07:00:00 UTC';
let targetAquiredMessage = 'acquired';
let label;

const output = document.querySelector('.timeOutput');
const canvasWrapper = document.querySelector('.canvas');
const mPI = Math.PI;
const mfloor = Math.floor;
const mrandom = Math.random;
const mcos = Math.cos;
const msin = Math.sin;
const height = width = 500;
const midX = midY = height * .5;
let canvas, ctx;
let lineWeights,arcs,colours,radius, centerRadius = 80;
const bgCol = 'whitesmoke';
let baseEdgeCol = '#900';
let edgeCol = baseEdgeCol;
let achievedCol = '#2a2';
const shellSets = [
	{lineWeights:[1], colours:['#888'], min:[10], variance:[10], radius:250},
	{lineWeights:[3], colours:['#666'], min:[10], variance:[10], radius:249},
	{lineWeights:[4], colours:['#333'], min:[10], variance:[10], radius:246},
	{lineWeights:[1,3], colours:['#999','#600'], min:[10, 3], variance:[20,30], radius:247},
	{lineWeights:[1,3], colours:['#333','#700'], min:[15], variance:[50,10], radius:245},
	{lineWeights:[1,8], colours:[bgCol,'#800'], min:[10], variance:[20], radius:242},
	{lineWeights:[2,8,15,8], colours:[edgeCol], min:[10,8,2], variance:[30,8,4], radius:234},
	{lineWeights:[1,25], colours:[bgCol,edgeCol], min:[10,3], variance:[30,10], radius:234},
	{lineWeights:[1,2], colours:[bgCol,edgeCol], min:[3], variance:[50], radius:209},
	{lineWeights:[1,10], colours:[bgCol,edgeCol], min:[10,3], variance:[30,10], radius:209}
];
const lineSets = [
	{aStart:0, aEnd:20, rInner:centerRadius + 2, rOuter:229},
	{aStart:21, aEnd:40, rInner:150, rOuter:229},
	{aStart:41, aEnd:60, rInner:150, rOuter:229},
	{aStart:61, aEnd:115, rInner:centerRadius + 2, rOuter:229},
	{aStart:140, aEnd:150, rInner:centerRadius + 2, rOuter:229},
	{aStart:151, aEnd:180, rInner:150, rOuter:229},
	{aStart:181, aEnd:205, rInner:centerRadius + 2, rOuter:229},
	{aStart:240, aEnd:270, rInner:centerRadius + 2, rOuter:229},
	{aStart:271, aEnd:290, rInner:150, rOuter:229},
	{aStart:291, aEnd:325, rInner:centerRadius + 2, rOuter:229},
	{aStart:326, aEnd:338, rInner:150, rOuter:229},
	{aStart:339, aEnd:359, rInner:150, rOuter:229},
	
	// horizontal triplet
	{aStart:21, aEnd:35, rInner:130, rOuter:132},
	{aStart:21, aEnd:35, rInner:133, rOuter:135},
	{aStart:21, aEnd:35, rInner:136, rOuter:138},
	// vertical triplet
	{aStart:43, aEnd:43.5, rInner:150, rOuter:175},
	{aStart:44, aEnd:44.5, rInner:150, rOuter:175},
	{aStart:45, aEnd:45.5, rInner:150, rOuter:175},
	//
	{aStart:142.5, aEnd:143.5, rInner:82, rOuter:120},
	{aStart:144.5, aEnd:145.5, rInner:82, rOuter:120},
	{aStart:146.5, aEnd:147.5, rInner:82, rOuter:120},
	//
	{aStart:170, aEnd:180, rInner:193, rOuter:195},
	{aStart:170, aEnd:180, rInner:196, rOuter:198},
	{aStart:170, aEnd:180, rInner:199, rOuter:201},
	//
	{aStart:181, aEnd:191, rInner:193, rOuter:195},
	{aStart:181, aEnd:191, rInner:196, rOuter:198},
	{aStart:181, aEnd:191, rInner:199, rOuter:201},
	//
	{aStart:243, aEnd:243.5, rInner:185, rOuter:229},
	{aStart:244, aEnd:244.5, rInner:185, rOuter:229},
	{aStart:245, aEnd:245.5, rInner:185, rOuter:229},
	//
	{aStart:320, aEnd:320.5, rInner:185, rOuter:229},
	{aStart:321, aEnd:321.5, rInner:185, rOuter:229},
	{aStart:322, aEnd:322.5, rInner:185, rOuter:229},
	// filled dots
	{aStart:62, aEnd:63, rInner:135, rOuter:138, fill:['#0f0', '#f00', '#f00']},
	{aStart:64, aEnd:65, rInner:135, rOuter:138, fill:['#f00', '#0f0', '#f00']},
	{aStart:66, aEnd:67, rInner:135, rOuter:138, fill:['#f00', '#f00', '#0f0']},
	//
	{aStart:241, aEnd:243, rInner:83.5, rOuter:87, fill:['#ddd', '#ddd', '#ddd', '#ddd', '#ffbf00']},
	//
	{aStart:357, aEnd:359, rInner:160, rOuter:162, fill:['#ff0', '#ff0', '#f00', '#0f0', '#f00']},
	{aStart:357, aEnd:359, rInner:163, rOuter:165, fill:['#f00']},
	{aStart:357, aEnd:359, rInner:166, rOuter:168, fill:['#f00']}
];
let tick = 0;
let blink = 0;
let animateEdge = true;
let targetAchieved = false;
let targetMessage;

function parseMillisecondsIntoReadableTime(){
	const milliseconds = (new Date().getTime() - new Date(targetDate).getTime()) * -1;
	const days = mfloor(milliseconds / (1000 * 60 * 60 * 24));
	const hours = milliseconds / (1000*60*60) - (days * 24);
	let absoluteHours = mfloor(hours);
	const minutes = (hours - absoluteHours) * 60;
	const absoluteMinutes = mfloor(minutes);
	const seconds = mfloor((minutes - absoluteMinutes) * 60);
	
	let displayD = days < 10 ? `0${days}` : days;
	let displayH = absoluteHours < 10 ? `0${absoluteHours}` : absoluteHours;
	let displayM = absoluteMinutes < 10 ? `0${absoluteMinutes}` : absoluteMinutes;
	let displayS = seconds < 10 ? `0${seconds}` : seconds;
	
	targetAchieved = milliseconds > 0 ? false : true;
	
	return milliseconds > 0 ? `${targetMessage}${displayD}d:${displayH}h<br>${displayM}m:${displayS}s` :
								`${targetMessage}${targetAquiredMessage}`;
}

const getRadians = (deg) => {
	return deg * (mPI / 180);
}
const getPointFromCenter = (radian, radius) => {
  return {x:radius * mcos(radian)+midX, y:radius * msin(radian) + midY};
}

const drawEdge = () => {
	let arcStart = 0;
	arcs.map((arc, i) => {
		const weight = lineWeights[i % lineWeights.length];
		const arcEnd = getRadians(arc);
		ctx.strokeStyle = colours[i % colours.length];
		ctx.lineWidth = weight;
		ctx.beginPath();
		ctx.arc(midX, midY, radius - weight * .5, arcStart, arcEnd, false);
		arcStart = arcEnd;
		ctx.stroke();
	});
}
const drawCenter = () => {
	let r = centerRadius;
	ctx.fillStyle = edgeCol;
	ctx.strokeStyle = '#888';
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.arc(midX, midY, r, 0, mPI * 2, false);
	ctx.fill();
	ctx.stroke();
	ctx.strokeStyle = '#a33';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(midX, midY, r - 3, 0, mPI * 2, false);
	ctx.stroke();
	ctx.strokeStyle = '#a55';
	ctx.beginPath();
	ctx.arc(midX, midY, r - 8, 0, mPI * 2, false);
	ctx.stroke();
}

const createCanvas = (w, h) => {
	let tCanvas = document.createElement('canvas');
	tCanvas.width = w;
	tCanvas.height = h;
	return tCanvas;
}
const init = () => {
	canvas = createCanvas(width, height);
	canvasWrapper.appendChild(canvas);
	ctx = canvas.getContext('2d');
}
init();

const generateEdge = () => {
	shellSets.map((set) => {
		let min = set.min;
		let variance = set.variance;
		let prev = 0;
		lineWeights = set.lineWeights;
		colours = set.colours;
		radius = set.radius;
		arcs = [];
		for(let i=0, loop=360; i<loop; i++){
			next = prev + mfloor(mrandom() * variance[i % variance.length] + min[i % min.length]);
			arcs.push(next);
			if(next > 360) break;
			prev = next;
		}
		drawEdge();
	});
	drawCenter();
}
const generateBgLines = () => {
	ctx.strokeStyle = '#aaa';
	ctx.lineWidth = 1;
	lineSets.map((set) => {
		let radian1 = getRadians(set.aStart);
		let radian2 = getRadians(set.aEnd);
		let pt1 = getPointFromCenter(radian1, set.rOuter);
		let pt2 = getPointFromCenter(radian1, set.rInner);
		let pt3 = getPointFromCenter(radian2, set.rInner);
		let pt4 = getPointFromCenter(radian2, set.rOuter);
		if(set.fill) ctx.fillStyle = set.fill[blink % set.fill.length];
		ctx.beginPath();
		ctx.moveTo(pt1.x, pt1.y);
		ctx.lineTo(pt2.x, pt2.y);
		ctx.arc(midX, midY, set.rInner, radian1, radian2, false);
		ctx.moveTo(pt3.x, pt3.y);
		ctx.lineTo(pt4.x, pt4.y);
		ctx.arc(midX, midY, set.rOuter, radian2, radian1, true);
		ctx.stroke();
		if(set.fill) ctx.fill();
	});
}
const generateDecals = () => {
	ctx.clearRect(0, 0, width, height);
	generateEdge();
	generateBgLines();
}

toggle.addEventListener('click', () => {animateEdge = !animateEdge});
generateDecals();

const updateCountdown = () => {
	if(!(tick % 30)){
		output.innerHTML = parseMillisecondsIntoReadableTime();
		if(targetAchieved) edgeCol = achievedCol;
		if(animateEdge && userAllowsAnimation) generateDecals();
		blink++;
	}
	tick++;
	requestAnimationFrame(updateCountdown);
}

requestAnimationFrame(updateCountdown);

const altDates = [
	{label:'~~~ 2021 ~~~', value:null, disabled:true},
	{label:'Star Wars Visions Launch', value:'September 22, 2021'},
	{label:'~~~ 2022 ~~~', value:null, disabled:true},
	{title:'Perseverance One year on Mars', label:'Perseverance & Ingenuity: One year on Mars', value:'Feb 17, 2022'},
	{label:'World Book Day', value:'March 3, 2022'},
	{label:'International Women\'s Day', value:'March 8, 2022'},
	{label:'Spring Solstice', value:'March 20, 2022'},
	{title:'The Skywalker Saga Game Launch', label:'LEGO Star Wars: The Skywalker Saga Launch', value:'April 5, 2022'},
	{label:'Earth Day', value:'April 22, 2022'},
	{label:'Star Wars Day', value:'May 4, 2022'},
	{label:'Andor series launch', value:'September 21, 2022'},
	{label:'International Day of Non-Violence', value:'October 2, 2022'},
	{label:'Winter Solistice', value:'December 21, 2022'},
	{label:'~~~ 2023 ~~~', value:null, disabled:true},
	{label:'World Book Day', value:'March 3, 2023'},
	{label:'International Women\'s Day', value:'March 8, 2023'},
	{label:'Spring Solstice', value:'March 20, 2023'},
	{label:'Earth Day', value:'April 22, 2023'},
	{label:'Star Wars Celebration', value:'April 7, 2023'},
	{label:'Star Wars Day', value:'May 4, 2023'},
	{label:'Zelda Tears of the Kingdom Launch', value:'May 12, 2023'},
	{label:'International Day of Non-Violence', value:'October 2, 2023'},
	{label:'Winter Solistice', value:'December 21, 2023'},
]
const altDateSelect = document.querySelector('.dynamicList');
const addDateOption = ({label, value, disabled}) => {
	let opt = new Option(label, value);
	if(disabled) {
		opt.disabled = true;
	}
		
	altDateSelect.options[altDateSelect.options.length] = opt;
}
altDates.forEach(altDate => addDateOption(altDate));
altDateSelect.addEventListener('change', (e) => {
	edgeCol = baseEdgeCol;
	targetDate = e.target.value;
	label = altDates[e.target.selectedIndex].title ? altDates[e.target.selectedIndex].title : altDates[e.target.selectedIndex].label;
	targetMessage = `<span class='small'>target:<br><span class="title">${label.toLowerCase()}</span><br>${targetDate.toLowerCase()}</span><br>`;
});

// Feature added to show next available future date in list
let nextAvailableDate = null;
altDates.forEach((d,index) => {
	if(!d.value)return;
	if(!nextAvailableDate && new Date(d.value).getTime() - new Date().getTime() > 0){
		edgeCol = baseEdgeCol;
		nextAvailableDate = targetDate = d.value;
		label = altDates[index].title ? altDates[index].title : altDates[index].label;
		targetMessage = `<span class='small'>target:<br><span class="title">${label.toLowerCase()}</span><br>${targetDate.toLowerCase()}</span><br>`;
		altDateSelect.selectedIndex = index;
	}
})