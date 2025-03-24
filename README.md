# Vision Pro 3D Portfolio

A 3D portfolio website with Apple Vision Pro-inspired UI design that features cursor-driven camera movement in a 3D environment.

## Features

- 3D Forest environment with dynamic lighting
- Floating UI cards with project information
- Cursor-controlled camera movement
- Realistic 3D scene with depth and atmosphere
- Mobile-responsive design
- Custom cursor effect
- Apple Vision Pro-inspired glass morphism UI

## Technologies Used

- React 18
- TypeScript
- Vite
- Three.js
- React Three Fiber
- React Three Drei

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vision-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` folder.

## Project Structure

- `src/components/` - React components
  - `Scene.tsx` - Main 3D scene setup
  - `UI.tsx` - All UI components in 3D space
  - `ForestEnvironment.tsx` - 3D forest environment
  - `CursorEffect.tsx` - Custom cursor effect
- `src/styles/` - CSS files
- `public/` - Static assets

## Customization

To change the content of the portfolio:
1. Modify the project data in `src/components/UI.tsx`
2. Update styles in the CSS files
3. Add your own 3D models or textures as needed

## License

MIT

## Acknowledgements

- Design inspired by Apple Vision Pro UI
- Forest environment based on Three.js examples
