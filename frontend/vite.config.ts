import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const PORT = parseInt(env.PORT, 10);
    const BACKEND_URL = env.BACKEND_URL;
    const API_BASE_URL = env.VITE_API_BASE_URL;
    const SOCKET_PATH = env.VITE_SOCKET_PATH;

    return {
        plugins: [react(), tailwindcss()],
        cacheDir: "./node_modules/.vite_cache", // Chỉ định rõ thư mục lưu cache tối ưu tốc độ scan thư viện
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },

        // Pre-bundle trước các thư viện nặng để tránh bị reload trang lúc dev
        optimizeDeps: {
            include: [
                "react",
                "react-dom",
                "antd",
                "@mui/material",
                "md-editor-rt",
                "react-markdown",
            ],
        },

        // Tự động xóa sạch console.log khi đóng gói
        esbuild: {
            drop: mode === "production" ? ["console", "debugger"] : [],
        },

        // Cấu hình Server
        server: {
            port: PORT, // Đổi cổng chạy Local
            strictPort: true, // Nếu trùng cổng thì báo lỗi ngay lập tức thay vì tự nhảy sang cổng khác
            host: true, // Mở rộng host để Docker hoặc các thiết bị trong cùng mạng LAN có thể truy cập được
            headers: {
                "X-Frame-Options": "DENY",
                "X-Content-Type-Options": "nosniff",
                "X-Powered-By": "Vite",
            },
            proxy: {
                [API_BASE_URL]: {
                    target: BACKEND_URL,
                    changeOrigin: true,
                },
                [SOCKET_PATH]: {
                    target: BACKEND_URL,
                    ws: true,
                    changeOrigin: true,
                },
            },
            watch: {
                usePolling: true, // Ép Vite liên tục quét file, sửa lỗi Docker không kích hoạt được hot reload trên một số máy Linux/Windows
            },
        },

        // Cấu hình cho lệnh `npm run preview` (Kiểm tra thử bản build Production ở local)
        preview: {
            port: PORT,
            strictPort: true,
            host: true,
        },

        // Cấu hình đóng gói
        build: {
            outDir: "dist", // Thư mục đầu ra sau khi build hoàn tất
            cssMinify: true,
            minify: "esbuild",
            sourcemap: mode !== "production", // Chỉ bật sourcemap ở môi trường dev/staging để debug, tắt ở prod để bảo mật
            chunkSizeWarningLimit: 800, // Tăng giới hạn cảnh báo dung lượng file từ 500kb lên 800kb (phù hợp với app Admin)

            // Tối ưu hóa dung lượng Bundle
            rollupOptions: {
                output: {
                    // Code Splitting: Tách các thư viện UI nặng ra thành các file .js độc lập
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            if (
                                id.includes("@mui") ||
                                id.includes("@emotion")
                            ) {
                                return "vendor-mui"; // Gom cụm Material UI
                            }
                            if (
                                id.includes("antd") ||
                                id.includes("@ant-design")
                            ) {
                                return "vendor-antd"; // Gom cụm Ant Design
                            }
                            if (
                                id.includes("react") ||
                                id.includes("react-dom") ||
                                id.includes("react-router")
                            ) {
                                return "vendor-react-core"; // Gom cụm các thư viện cốt lõi của React
                            }
                            // Toàn bộ các thư viện nhỏ lẻ khác sẽ nằm chung trong gói vendor tổng
                            return "vendor-others";
                        }
                    },
                    // Định dạng tên file sau khi build kèm theo mã hash để trình duyệt tự động xóa cache khi update code mới
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                    assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
                },
            },
        },
    };
});
