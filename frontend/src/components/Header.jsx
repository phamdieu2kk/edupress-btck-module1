// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          EduPress
        </Link>

        {/* Menu điều hướng */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
          <Link to="/courses" className="hover:text-blue-600">Khóa học</Link>
          <Link to="/about" className="hover:text-blue-600">Về chúng tôi</Link>
          <Link to="/contact" className="hover:text-blue-600">Liên hệ</Link>
        </nav>

        {/* Nút hành động */}
        <div className="space-x-2">
          <Link to="/login" className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
            Đăng nhập
          </Link>
          <Link to="/register" className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
