type LayoutProps = {
	children: React.ReactNode;
};

export default function (props: LayoutProps) {
	return <div className="container">{props.children}</div>;
}
