// import AppLayout from "@/components/layouts/App.layout";
// import AffiliateList from "@/features/affiliate/components/AffiliateList";
// import ArticleDetail from "@/features/article/components/ArticleDetail.layout";
// import ArticleEditor from "@/features/article/components/ArticleEditor";
// import ArticleList from "@/features/article/components/ArticleList";
// import RecommendedArticle from "@/features/article/components/RecommendedArticle";
// import Dashboard from "@/features/dashboard/components/DashBoard";
// import ProductDetail from "@/features/product/components/ProductDetail";
// import ProductList from "@/features/product/components/ProductList";
// import ShopDetail from "@/features/shop/components/ShopDetail";
// import ShopList from "@/features/shop/components/ShopList";
// import ArticleLayout from './../../features/article/components/Article.layout';
// import ArticlePreview from "@/features/article/components/ArticlePreview";

// export default [
//     {
//         path: "/",
//         element: <AppLayout />,
//         // loader: requireAuthLoader,
//         children: [
//             {
//                 path: "dashboard",
//                 children: [
//                     { index: true, element: <Dashboard /> },
//                 ]
//             },
//             {
//                 path: "products",
//                 children: [
//                     { index: true, element: <ProductList /> },
//                     { path: "id/:id", element: <ProductDetail /> },
//                     { path: "edit/:id", element: <ProductDetail /> },
//                     { path: "new", element: <ProductDetail /> },
//                 ],
//             },
//             {
//                 path: "affiliate-links",
//                 children: [
//                     { index: true, element: <AffiliateList /> },
//                 ],
//             },
//             {
//                 path: "articles",
//                 element: <ArticleLayout/>,
//                 children: [
//                     { index: true, element: <ArticleList /> },
//                     { path: "recommended", element: <RecommendedArticle /> },
//                     { path: "archived", element: <ArticleEditor /> },
//                 ]
//             },
//             {
//                 path: "article",
//                 element: <ArticleDetail/>,
//                 children: [
//                     { path: "id/:id", element: <ArticlePreview /> },
//                     { path: "edit/:id", element: <ArticleEditor /> },
//                     { path: "new", element: <ArticleEditor /> },
//                 ]
//             },
//             {
//                 path: "categories",
//                 children: [
//                     { index: true, element: <ShopList /> },
//                     { path: "id/:id", element: <ShopDetail /> },
//                 ]
//             },
//             {
//                 path: "shops",
//                 children: [
//                     { index: true, element: <ShopList /> },
//                     { path: "id/:id", element: <ShopDetail /> },
//                 ]
//             },
//         ],
//     },
// ];
