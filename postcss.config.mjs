// Replaces Next's default PostCSS plugins: postcss-flexbugs-fixes would rewrite `flex: 1 0 0px`
// to `1 0 0%`, which changes the layout of the ported styles.
export default { plugins: {} };
