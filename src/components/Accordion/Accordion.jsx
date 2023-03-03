import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IconCaretUp } from "../Icon/Icon";

import styles from './Accordion.module.css';

const AccordionContext = createContext(null);

function Accordion({ className, children, ...restProps }) {
	const [ acc, setAcc ] = useState({});
	const value = useMemo(() => ({
		acc, 
		setAcc, 
	}), [acc, setAcc]);

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
	const contentRef = useRef();

	const handleToggleContent = () => {
		const isOpen = !acc[itemKey];

		setAcc({
			[itemKey]: isOpen, 
		});

		if (isOpen) {
			const height = contentRef.current.scrollHeight;

			contentRef.current.style.height = height + 'px';
		} else {
			contentRef.current.style.height = '';
		}
	}

	return (
		<li
			className={className ? [styles.item, className].join(' ') : styles.item}
			{...restProps}
		>
			<button
				className={acc[itemKey] ? [styles.trigger, styles.triggerActive].join(' ') : styles.trigger}
				aria-expanded={acc[itemKey] ? true : false}
				aria-controls={`content-${itemKey}`}
				onClick={handleToggleContent}
			>
				{title}
				<IconCaretUp className={acc[itemKey] ? [styles.icon, styles.iconActive].join(' ') : styles.icon}/>
			</button>
			<div
				className={styles.content}
				id={`content-${itemKey}`}
				ref={contentRef}
			>
				{content}
			</div>
		</li>
	)
}

export {
	Accordion, 
	AccordionItem, 
}