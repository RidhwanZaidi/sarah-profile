# Business Profile Web Application - Go & Gin

A beautiful, techy business profile website built with Go and the Gin web framework. Features a modern dark theme with cyan accents, smooth animations, and mobile-first responsive design.

## 🚀 Features

- **Modern Tech Design**: Dark gradient background with glowing cyan accents
- **Mobile-First Responsive**: Optimized for mobile devices with desktop enhancements
- **Interactive Contact Cards**: Click-to-call phone and email functionality
- **Animated Profile Picture**: Floating animation with pulsing glow effects
- **Tech Stack Display**: Animated badges showing programming languages and tools
- **Desktop Enhancements**: Code background animation and stats section
- **Smooth Animations**: CSS animations with staggered loading effects
- **API Endpoints**: RESTful endpoints for contact actions

## 🛠 Tech Stack

- **Backend**: Go with Gin framework
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)

## 📁 Project Structure

```
business_profile_go/
├── main.go                 # Main Go application
├── templates/
│   └── index.html         # HTML template
├── static/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── script.js      # JavaScript functionality
├── go.mod                 # Go module file
├── go.sum                 # Go dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Go 1.19 or higher
- Git

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd business_profile_go
   ```

3. Install dependencies:
   ```bash
   go mod tidy
   ```

4. Run the application:
   ```bash
   go run main.go
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 🎨 Customization

### Profile Information

Edit the `ProfileData` struct in `main.go` to customize:

```go
profile := ProfileData{
    Name:        "Your Name",
    Title:       "Your Title",
    Phone:       "+1 (555) 123-4567",
    Email:       "your.email@example.com",
    TechStack:   []string{"Go", "Gin", "React", "Node.js", "Python"},
    Experience:  "5+",
    Projects:    "50+",
    Satisfaction: "100%",
}
```

### Styling

- **Colors**: Edit the CSS custom properties in `static/css/style.css`
- **Animations**: Modify animation durations and effects in the CSS
- **Layout**: Adjust responsive breakpoints and spacing

### Adding Features

- **New API Endpoints**: Add routes in `main.go`
- **Additional Sections**: Extend the HTML template and CSS
- **Enhanced Interactivity**: Add JavaScript functions in `script.js`

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and above
- **Tablet**: Enhanced layout for screens 768px and above
- **Desktop**: Additional features for screens 1024px and above

## 🔧 API Endpoints

- `GET /` - Main profile page
- `POST /contact/phone` - Phone contact API
- `POST /contact/email` - Email contact API
- `GET /health` - Health check endpoint

## 🚀 Deployment

### Build for Production

```bash
# Build the application
go build -o business-profile main.go

# Run the binary
./business-profile
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM golang:1.19-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/static ./static
CMD ["./main"]
```

Build and run:
```bash
docker build -t business-profile .
docker run -p 8080:8080 business-profile
```

## 🎯 Performance Features

- **Static File Serving**: Efficient serving of CSS, JS, and images
- **Template Caching**: HTML templates are loaded once at startup
- **Minimal Dependencies**: Lightweight Gin framework
- **Optimized CSS**: Efficient animations and responsive design

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

Built with ❤️ using Go and Gin
