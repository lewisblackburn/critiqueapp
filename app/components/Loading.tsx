import React from "react"
interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="absolute top-0 left-0 flex w-screen h-screen items-center justify-center bg-woodsmoke-900 text-woodsmoke-50">
      <div className="w-12 h-12 border-4 border-teal-600 rounded-full loader"></div>
      <style jsx>{`
        @keyframes loader-rotate {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .loader {
          border-right-color: transparent;
          animation: loader-rotate 1s linear infinite;
        }
      `}</style>
    </div>
  )
}
