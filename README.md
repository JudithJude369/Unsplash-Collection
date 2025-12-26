UnsplashBox— Unsplash Image Collections App

UnsplashBox is a modern React application that allows users to search high-quality images from Unsplash, view full image details, and organize images into custom collections. It integrates with the [Unsplash API](https://unsplash.com/developers) to deliver smooth, responsive, and intuitive experience for managing inspiration, assets, and visual ideas.

---

🚀 Features

🔍 Search Images — Find stunning photos by keyword using the Unsplash API.

🖼️ Image Details Page — View photographer info, publish date, and download images.

➕ Add to Collections — Save images into custom user-created collections.

📁 Collections Management — Create, view, and delete collections.

🖼️ Collection Preview — View all images saved inside each collection.

🔎 Search Collections — Quickly filter collections while adding images.

📌 Duplicate Prevention — Same image cannot be added twice to one collection.

⚙️ Dynamic Routing — Smooth navigation with React Router.

💾 Global State Management — Managed with Zustand.

⚡ Data Fetching & Caching — Powered by TanStack Query (React Query).

## 🎨 Modern UI/UX — Fully responsive design with Tailwind CSS.

# 🧰 Tech Stack

| Category               | Tools Used                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------- | --- |
| **Frontend Framework** | [React](https://react.dev/)                                                           |
| **Routing**            | [React Router DOM](https://reactrouter.com/)                                          |
| **Styling**            | [Tailwind CSS](https://tailwindcss.com/)                                              |
| **State Management**   | [Zustand](https://zustand-demo.pmnd.rs/)                                              |
| **Data Fetching**      | [Axios](https://axios-http.com/), [TanStack Query](https://tanstack.com/query/latest) |     |
| **Icons**              | [React Icons](https://react-icons.github.io/react-icons/)                             |

---

📸 Screenshots
![unsplash](https://github.com/user-attachments/assets/235d0a73-9f90-437b-841f-0e2888e2e686)

---

🌐 [Live Site URL](https://unsplash-collection-two.vercel.app/)

⚙️ Installation & Setup

Follow these steps to run the project locally:

1️⃣ Clone the repository
git clone https://github.com/JudithJude369/Unsplash-Collection.git

2️⃣ Navigate into the project directory
cd Unsplash-Collection

3️⃣ Install dependencies
npm install

4️⃣ Create a .env file and add your Unsplash API key
VITE_API_KEY=your_unsplash_access_key

5️⃣ Start the development server
npm run dev

Then open http://localhost:5173/
in your browser 🚀

🌍 API Source

This project uses the Unsplash API
—a powerful API that provides access to millions of high-quality free images.

🧩 Project Structure
Unsplash-Collection/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Home, Image Details, Collections pages
│ ├── store/ # Zustand global stores
│ ├── hooks/ # Custom hooks (e.g. debounce)
│ ├── App.jsx # App routing
│ └── main.jsx # Entry point
└── package.json

💡 Future Improvements

🔐 User authentication (login & signup)

💾 Cloud-based collections (Firebase / Supabase)

🌙 Dark mode toggle

🧭 Infinite scrolling

🏷️ Image tagging system

📤 Shareable collection links

🧑‍💻 Author

👩‍💻 Ifunanya Mmeremikwu

💼 LinkedIn: [ifunanya Mmeremikwu](https://www.linkedin.com/in/ifunanya-mmeremikwu/)

🌟 GitHub: JudithJude369

🪪 License

This project is open source and available under the MIT License.

⭐ Support

If you find this project helpful, please consider ⭐ starring the repository — it helps others discover it and motivates me to keep building awesome projects!
