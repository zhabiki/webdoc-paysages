import antfu from '@antfu/eslint-config'

export default antfu(
    {
        type: 'app',
        gitignore: true,

        stylistic: {
            indent: 4,
            quotes: 'single',
        },

        typescript: true,
        vue: true,
    },
    {
        rules: {
            'style/member-delimiter-style': ['error', { multiline: { delimiter: 'comma' }, singleline: { delimiter: 'comma' } }],
        },
    },
)
