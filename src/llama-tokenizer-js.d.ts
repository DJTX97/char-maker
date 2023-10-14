//Workaround for untyped js module
declare module 'llama-tokenizer-js' {
   const llamaTokenizer: any;
   export default llamaTokenizer;
}