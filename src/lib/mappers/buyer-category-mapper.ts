// import type {
//   Category,
// } from "@/types/category";

// import type {
//   CategoryDetail,
//   CategorySubcategory,
// } from "@/types/category-detail";

// const DEFAULT_CATEGORY_IMAGE =
//   "/images/home/categories/air-cooler.png";

// function getCategoryImage(
//   category: Category,
// ) {
//   return (
//     category.image ||
//     category.banner_image ||
//     DEFAULT_CATEGORY_IMAGE
//   );
// }

// export function mapCategoryChild(
//   category: Category,
//   parentSlug: string,
// ): CategorySubcategory {
//   return {
//     id: String(
//       category.category_id,
//     ),

//     title: category.name,

//     description:
//       category.description ??
//       "",

//     image:
//       getCategoryImage(
//         category,
//       ),

//     href: `/category/${parentSlug}/${category.slug}`,
//   };
// }

// export function mapCategoryDetail(
//   category: Category,
//   children: Category[],
// ): CategoryDetail {
//   return {
//     slug: category.slug,

//     title: category.name,

//     description:
//       category.description ??
//       "",

//     heroImage:
//       category.banner_image ||
//       category.image ||
//       DEFAULT_CATEGORY_IMAGE,

//     heroDescription:
//       category.description ??
//       "",

//     subcategoryCount:
//       children.length,

//     subcategories:
//       children.map(
//         (child) =>
//           mapCategoryChild(
//             child,
//             category.slug,
//           ),
//       ),
//   };
// }
