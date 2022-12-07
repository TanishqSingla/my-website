import Header from "./Header/Header";

type LayoutProps = {
	children: React.ReactNode;
};

export default function (props: LayoutProps) {
	return (
		<div className="container">
			<Header />
			{props.children}
		</div>
	);
}
