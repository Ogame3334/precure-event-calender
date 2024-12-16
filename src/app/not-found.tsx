import Image from "next/image";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="w-full h-screen flex items-center p-3">
      <div className="w-5/6 md:w-1/2 p-5 bg-pink-50 shadow-lg rounded-md outline outline-1 outline-pink-200 mx-auto">
        <div className="flex justify-center py-6">
          <Image
            src="/precale_logo.png"
            width={100}
            height={50}
            alt="PreCaleLogo"
            className="w-36"
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <div className="text-2xl text-center">404 - Page Not Found</div>
          <div className="my-5 text-sm text-center">お探しのページは見つかりませんでした。</div>
        </div>
      </div>
    </div>
  );
}
