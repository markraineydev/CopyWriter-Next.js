import React, { useEffect } from 'react';
import Head from 'next/head';
import { Layout, Menu, Grid } from 'antd';
import AppSlider from './sider';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_ACTIVE, STATUS_DEACTIVATE } from '../utils/constants';
import { readUser } from '../features/auth/authSlice';
import { readProject } from '../features/projects/projectsSlice';
import { useIntercom } from 'react-use-intercom';

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;
const AppLayout = ({ children }) => {
  const screens = useBreakpoint();
  const [user, loading, error] = useAuthState(firebaseAuth);
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const { boot } = useIntercom();

  useEffect(() => {
    if (user) {
      const { uid } = user;
      uid && dispatch(readUser({ uid }));
      uid && dispatch(readProject({ uid }));
    }
  }, [user]);

  const { status, setPassword } = userData;

  // useEffect(() => {
  //   return boot();
  // }, []);

  return (
    <>
      <Head>
        <title>CopyWriter</title>
        <meta name="description" content="templates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {user && (setPassword === true || setPassword === undefined) && status === STATUS_ACTIVE && (
        <Layout hasSider>
          {<AppSlider />}
          <Layout
            style={{
              marginLeft: (screens.xs === true || screens.sm === true) && screens.md === false ? 70 : 256,

              background: '#ffff !important',
            }}
          >
            <Content
              style={{
                overflow: 'initial',
                padding:
                  (screens.xs === true || screens.sm === true || screens.md === true) && screens.lg == false
                    ? '1rem'
                    : 0,
                background: '#ffff',
              }}
            >
              <>{children}</>
            </Content>
          </Layout>
        </Layout>
      )}
      {user && setPassword === false && (
        <Layout
          style={{
            background: '#ffff !important',
          }}
        >
          <Content
            style={{
              overflow: 'initial',
              background: '#ffff',
            }}
          >
            <>{children}</>
          </Content>
        </Layout>
      )}
      {user !== null && status === STATUS_DEACTIVATE && (
        <Layout
          style={{
            background: '#ffff !important',
          }}
        >
          <Content
            style={{
              overflow: 'initial',
              background: '#ffff',
            }}
          >
            <>{children}</>
          </Content>
        </Layout>
      )}
      {user == null && (
        <Layout
          style={{
            background: '#ffff !important',
          }}
        >
          <Content
            style={{
              overflow: 'initial',
              background: '#ffff',
            }}
          >
            <>{children}</>
          </Content>
        </Layout>
      )}
    </>
  );
};

export default AppLayout;
