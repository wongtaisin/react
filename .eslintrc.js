module.exports = {
    "root": true,
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        // 强制使用一致的缩进
        "indent": [
            "error",
            "tab"
        ],
        // 强制使用一致的单引号
        "jsx-quotes": [
            "error",
            "prefer-single"
        ],
        // 要求或禁止使用分号代替 ASI
        "semi": [
            "error",
            "never"
        ],
        // 禁止末尾逗号
        "comma-dangle": [
            "error",
            "never"
        ],
        // 要求使用骆驼拼写法
        "camelcase": [
            "warn",
            {
                "properties": "always"
            }
        ],
        // 关闭 console
        "no-console": "off",
        // 禁止 出现未使用过的变量
        "no-unused-vars": "error",
        // 禁止 多次声明同一变量
        "no-redeclare": "warn",
        // 警告 function 定义中出现重名参数
        "no-dupe-args": "error",
        // 关闭不必要的转
        "no-useless-escape": "off",
        // 禁止使用 空格 和 tab 混合缩进
        "no-mixed-spaces-and-tabs": "error",
        // 不允许多个空行
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1
            }
        ],
    },
    // 全局变量 将变量设置为 true 将允许变量被重写，或 false 将不允许被重写
    "globals": {
        "xmui": true,
        "$": true,
        "var2": false
    }
};
