/* eslint-disable */
export const UI_WINDOW_RESIZE = 'UI_WINDOW_RESIZE';
export const APPLICATION_INIT = 'APPLICATION_INIT';

const initialState = {
   isMobile: false,
   isMobileXS: false,
   isMobileSM: false
};

export default function layout (state = initialState, action) {
   const computeMobileStatuses = () => {
      const innerWidth = process.env.BROWSER ? window.innerWidth : 1024;
      const isMobile = innerWidth < 1025;// 1024px - is the main breakpoint in UI
      const isMobileXS = innerWidth < 481;
      const isMobileSM = innerWidth > 480 && innerWidth < 767;
      return {isMobileSM, isMobileXS, isMobile}
   };

   switch (action.type) {
      case APPLICATION_INIT:
      case UI_WINDOW_RESIZE: {
         const {isMobile, isMobileSM, isMobileXS} = computeMobileStatuses();
         return {
            ...state,
            isMobile,
            isMobileSM,
            isMobileXS
         }
      }
      default:
         return state
   }
}


export const WINDOW_RESIZE = () => ({
   type: UI_WINDOW_RESIZE
});