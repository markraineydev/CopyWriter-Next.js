import '../styles/globals.css';
import { ConfigProvider } from 'antd';
import { theme } from '../theme';
import { useDispatch, useSelector, Provider } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase';
import store from '../store';
import AppLayout from '../layout';
import RouteGuard from '../components/routeGuard/index.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useEffect } from 'react';
import { IntercomProvider, useIntercom } from 'react-use-intercom';

TimeAgo.addDefaultLocale(en);

function MyApp({ Component, pageProps }) {
  // const INTERCOM_APP_ID = 'u30pyhm4';

  useEffect(() => {
    // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/u30pyhm4'
    (function () {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        var d = document;
        var i = function () {
          i.c(arguments);
        };
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        var l = function () {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/u30pyhm4';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
    window.Intercom('boot', {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'u30pyhm4',
    });
    window.Intercom('update');
  }, []);

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AppLayout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </AppLayout>
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
