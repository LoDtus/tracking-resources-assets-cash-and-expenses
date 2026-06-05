const DATABASE_NAME = "trace";
db = db.getSiblingDB(DATABASE_NAME);


if (!db.getCollectionNames().includes("medias")) {
    db.createCollection("medias");
    print("✅ Đã tạo collection: medias");
}
db.medias.createIndex({ "slug": 1 }, { unique: true, name: "idx_medias_slug_unique" });


if (!db.getCollectionNames().includes("shops")) {
    db.createCollection("shops");
    print("✅ Đã tạo collection: shops");
}
db.shops.createIndex({ "slug": 1 }, { unique: true, name: "idx_shops_slug_unique" });


if (!db.getCollectionNames().includes("products")) {
    db.createCollection("products");
    print("✅ Đã tạo collection: products");
}
db.products.createIndex({ "slug": 1 }, { unique: true, name: "idx_products_slug_unique" });
db.products.createIndex({ "shopId": 1 }, { name: "idx_products_shop" });
db.products.createIndex({ "categoryId": 1 }, { name: "idx_products_category" });
db.products.createIndex({ "name": "text" }, { name: "idx_products_text_search" });