const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Imports
content = content.replace('import { Suspense, useRef } from "react";', 'import { Suspense, useRef, useEffect, useState } from "react";\nimport { client } from "../sanityClient";');

// 2. Inside Home component
const homeStart = content.indexOf('export default function Home() {');
if (homeStart !== -1) {
    const insertion = `
	const [data, setData] = useState(null);

	useEffect(() => {
		client.fetch('*[_type == "homePage"][0]').then(res => {
			if (res) setData(res);
		}).catch(console.error);
	}, []);

	const heroTitle = data?.heroTitle || "Investing is Difficult";
	const heroSubtitle = data?.heroSubtitle || "It is difficult for large institutions, and it is even more difficult for individuals because they have less knowledge and resources. You can make it easier by evaluating our suggestions and if you are convinced, implement them.";
	const focusPills = data?.focusPills || [
		"Simple investment strategies that have a logic and can be implemented",
		"Reducing the clutter of options to a few good ones, saving you time and effort",
	];
	const sps = data?.startingPoints?.length > 0 ? data.startingPoints : startingPoints;
	const scopeTitle = data?.scopeTitle || "Scope";
	const scopeText = data?.scopeText || "The current scope covers financial assets such as mutual funds, government sponsored financial instruments and fixed deposits.";
	const expectationsTitle = data?.expectationsTitle || "What you can expect";
	const expectationsData = data?.expectations?.length > 0 ? data.expectations : [
		{ mark: "→", heading: "Better Strategy", desc: "Creation of a better match between your goals, circumstances and preferences and your investments." },
		{ mark: "→", heading: "Reduced Complexity", desc: "Reduced investing complexity and better understanding of investment choices." },
		{ mark: "→", heading: "Improved Returns", desc: "Improved returns — a little." },
		{ mark: "→", heading: "Reduced Risk", desc: "Reduced risk — a little." },
	];
	const notExpectationsTitle = data?.notExpectationsTitle || "What you should not expect";
	const notExpectationsData = data?.notExpectations?.length > 0 ? data.notExpectations : [
		{ heading: "Exponential Returns", desc: "Substantial improvement in returns." },
		{ heading: "Elimination of Risk", desc: "Elimination, or substantial reduction of the risk of loss." },
		{ heading: "Reduced Stress", desc: "Reduced stress in investing." },
	];
	const audienceTitle = data?.audienceTitle || "Who is it for?";
	const audienceParagraphsData = data?.audienceParagraphs?.length > 0 ? data.audienceParagraphs : [
		"The resources on this website will be of help to anyone interested in investing. However, the primary focus of the content is individual investors who have limited time, resources and expertise to devote to investment research and analyses.",
		"Every individual can also get some simple guidance to have a pretty good solution without knowing or learning too much about this, but everyone should learn a little bit."
	];
	const ctaTitle = data?.ctaTitle || "Personalised Consulting";
	const ctaText = data?.ctaText || "The philosophy, strategy and suggestions shared on these pages are of universal relevance and should deliver value to every investor. Should you wish to seek a confidential, one-on-one, paid consulting with one of our experts, kindly click the button below. Personalised consulting is expected to be launched in the future. At this time you will be joining a wait-list. We will reach out when the service comes on-stream and a slot becomes available to arrange a session at a mutually convenient time.";
	const ctaButtonText = data?.ctaButtonText || "I would like a personalised consulting session";
	const ctaButtonLink = data?.ctaButtonLink || "/consulting-waitlist";
`;
    content = content.slice(0, homeStart + 'export default function Home() {'.length) + insertion + content.slice(homeStart + 'export default function Home() {'.length);
}

// 3. Replacements in JSX

content = content.replace('Investing is Difficult', '{heroTitle}');
content = content.replace('It is difficult for large institutions, and it is even more difficult for individuals because they have less knowledge and resources. You can make it easier by evaluating our suggestions and if you are convinced, implement them.', '{heroSubtitle}');

content = content.replace(\`[
									"Simple investment strategies that have a logic and can be implemented",
									"Reducing the clutter of options to a few good ones, saving you time and effort",
								].map((text, i) => (\`, \`focusPills.map((text, i) => (\`);

content = content.replace('items={startingPoints}', 'items={sps}');
content = content.replace('text="Scope"', 'text={scopeTitle}');
content = content.replace('The current scope covers financial assets such as mutual funds, government sponsored financial instruments and fixed deposits.', '{scopeText}');
content = content.replace('text="What you can expect"', 'text={expectationsTitle}');

const expectOld = \`[
								{
									mark: "→",
									heading: "Better Strategy",
									desc: "Creation of a better match between your goals, circumstances and preferences and your investments.",
								},
								{
									mark: "→",
									heading: "Reduced Complexity",
									desc: "Reduced investing complexity and better understanding of investment choices.",
								},
								{
									mark: "→",
									heading: "Improved Returns",
									desc: "Improved returns — a little.",
								},
								{
									mark: "→",
									heading: "Reduced Risk",
									desc: "Reduced risk — a little.",
								},
							].map((b, i) => (\`;
content = content.replace(expectOld, 'expectationsData.map((b, i) => (');
content = content.replace('{b.mark}', '{b.mark || "→"}');

const notExpectOld = \`[
								{
									heading: "Exponential Returns",
									desc: "Substantial improvement in returns.",
								},
								{
									heading: "Elimination of Risk",
									desc: "Elimination, or substantial reduction of the risk of loss.",
								},
								{
									heading: "Reduced Stress",
									desc: "Reduced stress in investing.",
								},
							].map((b, i) => (\`;
content = content.replace(notExpectOld, 'notExpectationsData.map((b, i) => (');

content = content.replace('text="Who is it for?"', 'text={audienceTitle}');

const audOld = \`<p className="t-body no-split mb-5" style={{ maxWidth: 560 }}>
								The resources on this website will be of help to anyone interested in investing. However, the primary focus of the content is individual investors who have limited time, resources and expertise to devote to investment research and analyses.
							</p>
							<p className="t-body no-split" style={{ maxWidth: 560 }}>
								Every individual can also get some simple guidance to have a pretty good solution without knowing or learning too much about this, but everyone should learn a little bit.
							</p>\`;
content = content.replace(audOld, \`{audienceParagraphsData.map((p, i) => (<p key={i} className={\\\`t-body no-split \\\${i !== audienceParagraphsData.length - 1 ? "mb-5" : ""}\\\`} style={{ maxWidth: 560 }}>{p}</p>))}\`);

content = content.replace('text="Personalised Consulting"', 'text={ctaTitle}');
content = content.replace('The philosophy, strategy and suggestions shared on these pages are of universal relevance and should deliver value to every investor. Should you wish to seek a confidential, one-on-one, paid consulting with one of our experts, kindly click the button below. Personalised consulting is expected to be launched in the future. At this time you will be joining a wait-list. We will reach out when the service comes on-stream and a slot becomes available to arrange a session at a mutually convenient time.', '{ctaText}');
content = content.replace('text="I would like a personalised consulting session"', 'text={ctaButtonText}');
content = content.replace('to="/consulting-waitlist"', 'to={ctaButtonLink}');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Success');
