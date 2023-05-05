class ViewSDKClient {
  constructor() {
    this.readyPromise = new Promise((resolve) => {
      if (window.AdobeDC) {
        resolve();
      } else {
        document.addEventListener('adobe_dc_view_sdk.ready', () => {
          resolve();
        });
      }
    });
    this.adobeDCView = undefined;
  }

  ready() {
    return this.readyPromise;
  }

  previewFile(divId, viewerConfig, url, id, name) {
    console.log(name);
    if (id && url) {
      const config = {
        clientId: process.env.NX_ADOBE_CLIENT_ID,
      };
      if (divId) {
        config.divId = divId;
      }
      this.adobeDCView = new window.AdobeDC.View(config);
      const previewFilePromise = this.adobeDCView.previewFile(
        {
          content: {
            location: {
              url: url,
              headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
            },
          },
          metaData: {
            fileName: name,
            id: id,
          },
        },
        viewerConfig
      );
      return previewFilePromise;
    }
  }

  // registerSaveApiHandler() {
  //   const saveApiHandler = (metaData, content, options) => {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         const response = {
  //           code: window.AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
  //           data: {
  //             metaData: Object.assign(metaData, {
  //               updatedAt: new Date().getTime(),
  //             }),
  //           },
  //         };
  //         resolve(response);
  //       }, 2000);
  //     });
  //   };
  //   this.adobeDCView.registerCallback(
  //     window.AdobeDC.View.Enum.CallbackType.SAVE_API,
  //     saveApiHandler,
  //     {}
  //   );
  // }

  // registerEventsHandler() {
  //   this.adobeDCView.registerCallback(
  //     window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
  //     (event) => {
  //       console.log(event);
  //     },
  //     {
  //       enablePDFAnalytics: true,
  //     }
  //   );
  // }
}

export default ViewSDKClient;
