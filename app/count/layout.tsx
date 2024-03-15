function ProductsLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {children}
        </section>
    );
}

export default ProductsLayout;
