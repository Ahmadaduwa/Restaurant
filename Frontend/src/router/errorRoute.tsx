import ErrorPage from '../pages/ErrorPage';

const errorRoute = {
  path: '*', // ใช้ path แบบ wildcard เพื่อจับเส้นทางที่ไม่พบ
  element: <ErrorPage />,
};

export default errorRoute;
