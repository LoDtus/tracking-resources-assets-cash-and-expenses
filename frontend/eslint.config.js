import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    // Loại bỏ các thư mục rác khỏi tầm quét của ESLint
    globalIgnores([
        'dist',
        'node_modules',
        '.vite_cache',
        'build',
    ]),

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'import': importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
                node: true
            },
        },
        languageOptions: {
            ecmaVersion: 2022, // Nâng lên 2022 để hỗ trợ các cú pháp hiện đại hơn
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node, // Hỗ trợ thêm biến môi trường (process, __dirname)
            },
            parserOptions: {
                projectService: true, // Giúp TypeScript ESLint hiểu toàn bộ kiến trúc project mà không bị chậm
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],

            '@typescript-eslint/no-explicit-any': 'warn', // Chấp nhận kiểu dữ liệu `any` (chỉ cảnh báo)
            'no-unused-vars': 'off', // Chấp nhận biến khai báo nhưng chưa sử dụng (chỉ cảnh báo)
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_', // Bỏ qua nếu tham số bắt đầu bằng dấu gạch dưới (ví dụ: _req, _res)
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],

            // Import theo thứ tự
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Thư viện core của Node (fs, path...)
                        'external', // Thư viện ngoài (react, antd, @mui...)
                        'internal', // Code nội bộ thông qua alias ( @/... )
                        ['sibling', 'parent'], // Code cùng thư mục hoặc thư mục cha
                        'index', // File index
                        'object',
                        'type' // Các loại Type/Interface
                    ],
                    'newlines-between': 'always', // Bắt buộc có dòng trống giữa các nhóm import lớn
                    alphabetize: { order: 'asc', caseInsensitive: true } // Sắp xếp theo bảng chữ cái từ A-Z
                }
            ],

            'no-duplicate-imports': 'error', // Không cho import trùng lặp file
            'import/no-duplicates': 'error',
            'react-hooks/rules-of-hooks': 'error', // Ép viết Hooks đúng chuẩn của React (Không viết Hooks trong câu lệnh if/vòng lặp)
            'react-hooks/exhaustive-deps': 'warn', // Ngăn chặn việc viết mảng rỗng để quản lý useEffect, tránh lỗi lặp vô hạn
            '@typescript-eslint/strict-boolean-expressions': 'off', // Tắt luật quá nghiêm khắc của TS
            'no-mixed-operators': 'warn', // Kiểm tra lỗi số 0 của React
            'no-var': 'error', // Không cho phép dùng var
            'prefer-template': 'warn', // Ưu tiên ghép chuỗi bằng ${} thay vì sử dụng toán tử +
            "no-console": ["warn", { allow: ["warn", "error"] }], // Cảnh báo khi sử dụng console.log
            "eqeqeq": ["error", "always"], // Ép sử dụng === thay vì ==
            "react/jsx-no-target-blank": "error", // Bảo mật an toàn bảo mật khi mở tab mới
            "react/self-closing-comp": "error", // Ép đóng thẻ rút gọn cho code ngắn sạch
        },
    },
])