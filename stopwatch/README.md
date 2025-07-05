# ⏱️ Stopwatch Web Application

A fully functional, responsive stopwatch web application built with HTML, CSS, and JavaScript.

## 🚀 Features

- **Precise Time Tracking**: Displays time in hours, minutes, seconds, and milliseconds
- **Complete Control**: Start, pause, and reset functionality
- **Lap Time Recording**: Track and display multiple lap times
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Quick access with keyboard controls
- **Modern UI**: Clean, user-friendly interface with smooth animations
- **Visual Feedback**: Button states and running indicators

## 📱 Screenshots

### Desktop View
![Desktop View](https://github.com/user-attachments/assets/cde89fcd-11b9-4df4-b018-56a41dd4ef3e)

### With Lap Times
![With Lap Times](https://github.com/user-attachments/assets/a5719267-ad24-4f07-b975-c41802770529)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/098366e6-7956-46c3-8bb9-575078965025)

## 🎮 How to Use

### Button Controls
- **Start**: Begin timing
- **Pause**: Pause the current time
- **Reset**: Reset timer to 00:00:00:000 and clear lap times
- **Lap**: Record current time as a lap (only available when running)

### Keyboard Shortcuts
- **Space**: Start/Pause the stopwatch
- **R**: Reset the stopwatch
- **L**: Record a lap time

## 🛠️ Technical Details

### Files Structure
```
stopwatch/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

### Technologies Used
- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with flexbox, animations, and responsive design
- **JavaScript ES6+**: Object-oriented programming with classes
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Animations**: Smooth transitions and visual feedback

### Key Features Implemented
- **Object-Oriented Design**: Clean, maintainable JavaScript code
- **Responsive Breakpoints**: Optimized for mobile (480px), tablet (768px), and desktop
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Efficient 10ms timer updates for smooth display
- **Visual Polish**: Gradient backgrounds, hover effects, and animations

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🚀 Getting Started

1. Clone or download the files
2. Open `index.html` in your web browser
3. Start timing!

### Running with a Local Server
For the best experience, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📋 Features Checklist

- [x] Clean and user-friendly interface
- [x] Time display in hours, minutes, seconds, and milliseconds
- [x] Start functionality
- [x] Pause functionality  
- [x] Reset functionality
- [x] Lap time tracking and display
- [x] Responsive design for all screen sizes
- [x] Keyboard shortcuts
- [x] Visual feedback and animations
- [x] Modern, accessible design

## 🎨 Design Highlights

- **Purple Gradient Background**: Modern, eye-catching design
- **Glass Morphism**: Semi-transparent card with backdrop blur
- **Smooth Animations**: Fade-in effects and button hover states
- **Color-Coded Buttons**: Intuitive green (start), orange (pause), red (reset), blue (lap)
- **Monospace Timer**: Clear, readable time display
- **Mobile-First**: Optimized for touch interactions

## 🔧 Customization

The application is easily customizable:

- **Colors**: Modify the CSS custom properties for theme changes
- **Fonts**: Update the font-family declarations
- **Layout**: Adjust the responsive breakpoints
- **Timing**: Change the update interval in the JavaScript (currently 10ms)

## 📝 License

This project is open source and available under the MIT License.

---

⭐ **Enjoy using the Stopwatch app!** Feel free to contribute or suggest improvements.