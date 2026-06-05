const DATABASE_NAME = "trace";
db = db.getSiblingDB(DATABASE_NAME);

print(`==================================================`);
print(`[INIT] Creating database: ${DATABASE_NAME}`);
print(`==================================================`);

if (typeof reset !== 'undefined' && reset === true) {
    db.dropDatabase();
    print(`[DEV ONLY] Đã xóa sạch dữ liệu cũ để làm mới cấu trúc!`);
}

// mongosh --eval "var rst=true;" 01-setup.js → DB sẽ bị xóa