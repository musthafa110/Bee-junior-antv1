import '../styles/globals.css';
import { StoreProvider } from '../context/StoreContext';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';
import ProductModal from '../components/ProductModal';
import Toast from '../components/Toast';

export const metadata = {
  title: 'bee JUNIOR — Little Styles for Big Dreams | Premium Children\'s Clothing',
  description: 'Comfortable. Playful. Everyday Wear. Premium children\'s clothing crafted from soft organic cotton and natural breathable fabrics for kids 1-5 years.',
  keywords: 'bee junior, kids clothing, organic cotton kidswear, baby clothes, premium kids fashion',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <StoreProvider>
          {children}
          <CartDrawer />
          <SearchModal />
          <ProductModal />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
