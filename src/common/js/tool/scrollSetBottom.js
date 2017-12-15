//滚动条在Y轴上的滚动距离
export function getScrollTop() {
  let bodyScrollTop = 0,
    documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  return (bodyScrollTop - documentScrollTop > 0) ?
    bodyScrollTop :
    documentScrollTop;
}
//文档的总高度
export function getScrollHeight() {
  return document.documentElement.scrollTop == 0 ?
    document.body.scrollHeight :
    document.documentElement.scrollHeight
}
//浏览器视口的高度
export const getWindowHeight = () => (document.documentElement.scrollTop == 0 ?
  document.body.clientHeight :
  document.documentElement.clientHeight);

//判断鼠标是否滚动到文档底部
export const isScrollToDocumentBottom=()=> {
  //浏览器视口的高度
  const windowHeight = getWindowHeight();
  const scrollTop = getScrollTop() + windowHeight;  // scrollTop视口距离文档顶部的距离 = getScrollTop()滚动条在Y轴上的滚动距离+ windowHeight() 浏览器视口的高度
  //文档的总高度
  return scrollTop === getScrollHeight() && getScrollTop() !== 0
}
