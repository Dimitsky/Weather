import { createContext, useContext, useState } from "react";

import styles from './Accordion.module.css';

const AccordionContext = createContext(null);

function Accordion({ className, children, ...restProps }) {
	const [ acc, setAcc ] = useState({});

	const value = {
		acc, 
		setAcc, 
	}

	return (
		<AccordionContext.Provider value={value}>
			<ul
				className={className ? [styles.list, className].join(' ') : styles.list}
				{...restProps}
			>
				{children}
			</ul>
		</AccordionContext.Provider>
	)
}

function AccordionItem({ className, itemKey, title, content, ...restProps }) {
	const { acc, setAcc } = useContext(AccordionContext);

	const handleToggleContent = () => {
		setAcc((prevAcc) => ({
			[itemKey]: prevAcc[itemKey] ? false : true, 
		}))
	}

	return (
		<li
			className={className ? [styles.item, className].join(' ') : styles.item}
			{...restProps}
		>
			<button
				className={styles.trigger}
				aria-expanded={acc[itemKey] ? true : false}
				aria-controls={`content-${itemKey}`}
				onClick={handleToggleContent}
			>
				{title}
				{
					acc[itemKey] ? (
						<AccordionIconCaretDown />
					) : (
						<AccordionIconCaretUp />
					)
				}
			</button>
			{
				acc[itemKey] && (
					<div
						className={styles.content}
						id={`content-${itemKey}`}
					>
						{content}
					</div>
				)
			}
		</li>
	)
}

function AccordionIconCaretUp() {
	return (
		<svg 
			className={styles.icon} 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 16 16"
		>
  			<path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
		</svg>
	)
}

function AccordionIconCaretDown() {
	return (
		<svg 
			className={styles.icon} 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor" 
			viewBox="0 0 16 16"
		>
			<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
		</svg>
	)
}

export {
	Accordion, 
	AccordionItem, 
}