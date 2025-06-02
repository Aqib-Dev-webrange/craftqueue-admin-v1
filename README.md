# Craft Queue - Upholstery Management System

A modern, responsive web application built with Next.js for managing upholstery business operations including quotes, orders, bookings, and fabric inventory.

## 🎨 Features

### Core Functionality
- **Dashboard Overview** - Comprehensive business metrics and analytics
- **Upholstery Quotes** - Manage customer quotes and estimates
- **Order Management** - Track pillow orders and general orders
- **Booking System** - Handle client consultations and pickups
- **Fabric Management** - Inventory tracking for different fabric types
- **Order Tracker** - Real-time progress tracking for textile orders

### UI/UX Features
- **Responsive Design** - Mobile-first approach with desktop optimization
- **Modern Sidebar Navigation** - Animated sidebar with brand colors
- **Advanced Search** - Dynamic search with auto-suggestions across all modules
- **Interactive Tables** - Sortable, filterable data tables
- **Brand Consistency** - Warm brown/amber color palette throughout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/webrangesolutions/craftqueue-admin.git
cd craft-queue
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Fonts**: Geist Sans & Mono, Poppins
- **State Management**: React Hooks

## 📁 Project Structure

```
craft-queue/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/
│   │   │   ├── bookings/       # Booking management
│   │   │   ├── fabrics/        # Fabric inventory
│   │   │   ├── orders/         # Order management
│   │   │   │   └── tracker/    # Order tracking
│   │   │   └── upholstery/     # Upholstery quotes
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── sidebar/            # Navigation components
│   │   ├── table/              # Table components
│   │   ├── ui/                 # UI components
│   │   └── header/             # Header components
│   ├── constants/              # App constants
│   ├── utils/                  # Utility functions
│   │   └── data/               # Sample data
│   └── styles/                 # Global styles
├── public/                     # Static assets
└── README.md
```

## 🎨 Design System

### Brand Colors
```css
Primary: #745535 (Warm Brown)
Brand Palette:
- 50: #faf8f5 (Lightest)
- 100: #f5f0e8
- 200: #e8dcc6
- 300: #d4c19a
- 400: #c4a373
- 500: #b8925a
- 600: #a37c4a
- 700: #88653e
- 800: #745535 (Primary)
- 900: #5f452b (Darkest)
```

### Typography
- **Primary**: Geist Sans
- **Headings**: Poppins
- **Monospace**: Geist Mono

## 📱 Pages Overview

### Admin Dashboard (`/admin`)
- Business metrics overview
- Quick access to all modules
- Recent activity summaries

### Upholstery Management (`/admin/upholstery`)
- Customer quote management
- Furniture type categorization
- Quote status tracking

### Order Management (`/admin/orders`)
- Pillow orders tracking
- General orders overview
- Order status management

### Booking System (`/admin/bookings`)
- Client consultation scheduling
- Pickup appointments
- Booking status management

### Fabric Inventory (`/admin/fabrics`)
- Fabric type management
- Shipment tracking
- Inventory status monitoring

### Order Tracker (`/admin/orders/tracker`)
- Real-time order progress
- Textile project management
- Quote identifier tracking

## 🔍 Search Functionality

Each page includes advanced search capabilities:
- **Auto-suggestions** based on existing data
- **Debounced search** (300ms delay)
- **Multi-field filtering**
- **Real-time results**
- **Mobile-responsive design**

## 🎭 Animations & Interactions

- **Hover Effects**: Scale, translate, and color transitions
- **Active States**: Enhanced visual feedback
- **Loading States**: Smooth transitions
- **Mobile Gestures**: Touch-friendly interactions

## 🚀 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Adding New Features

1. **Create new page**: Add to `src/app/admin/[feature]/page.tsx`
2. **Update sidebar**: Modify `src/utils/data/sidebarData.ts`
3. **Add search**: Import and configure `SearchInput` component
4. **Style consistently**: Use brand colors and design tokens

## 📦 Components

### Core Components
- `SearchInput` - Advanced search with suggestions
- `TableView` - Data table with sorting/filtering
- `Sidebar` - Navigation with animations
- `SidebarItem` - Animated navigation items

### Usage Example
```tsx
import SearchInput from "@/components/ui/Input";

<SearchInput
  placeholder="Search items..."
  suggestions={suggestions}
  onSearch={handleSearch}
  size="md"
/>
```

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js Font optimization
- **CSS Optimization**: Tailwind CSS purging

## 🔮 Future Enhancements

- [ ] User authentication and roles
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Print/export functionality
- [ ] Mobile app development
- [ ] API integration
- [ ] Database integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For fonts and deployment platform
- **React Icons** - For the comprehensive icon library

## 📞 Support

For support, email support@craftqueue.com or join our Slack channel.

## 🔗 Links

- [Demo](https://craft-queue.vercel.app)
- [Documentation](https://docs.craftqueue.com)
- [Issues](https://github.com/your-username/craft-queue/issues)
- [Discussions](https://github.com/your-username/craft-queue/discussions)

---

Made with ❤️ for the upholstery industry
