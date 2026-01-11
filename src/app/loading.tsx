"use client";

export default function LoadingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-void">
            <div className="text-center">
                {/* Animated logo */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-lg animate-pulse" />
                    <div className="absolute inset-1 bg-void rounded-lg flex items-center justify-center">
                        <span className="text-3xl font-bold text-cyan animate-pulse">⬡</span>
                    </div>
                    {/* Rotating border */}
                    <div className="absolute -inset-1 border-2 border-transparent border-t-cyan rounded-lg animate-spin" />
                </div>

                {/* Loading text */}
                <div className="font-mono text-sm text-gray-400">
                    <span className="text-cyan">$</span> Loading
                    <span className="inline-block animate-pulse">...</span>
                </div>

                {/* Progress bar */}
                <div className="w-48 h-1 bg-surface rounded-full mx-auto mt-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan to-purple rounded-full animate-loading-bar" />
                </div>
            </div>

            <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 15%;
          }
          100% {
            width: 100%;
            margin-left: 0%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
