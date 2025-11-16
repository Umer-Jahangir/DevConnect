import React from "react";
import { LocaleSwitcher } from "lingo.dev/react/client";

const LanguageSwitcher = () => {
  return (
    <div
      className="
        flex items-center gap-2 
        md:gap-3 
        p-2 
        rounded-lg 
        border border-gray-200 dark:border-gray-700 
        bg-white dark:bg-gray-800 
        shadow-sm 
        cursor-pointer      /* ✅ main wrapper pointer */
        transition
        hover:shadow-md
        max-w-full
      "
    >
      {/* Desktop view */}
      <div className="hidden sm:block cursor-pointer">
        <LocaleSwitcher
          locales={["en", "ur", "hi", "es", "ar"]}
          className="cursor-pointer"   /* ✅ LocaleSwitcher pointer */
        />
      </div>

      {/* Mobile view */}
      <div className="sm:hidden w-full cursor-pointer">
        <LocaleSwitcher
          locales={["en", "ur", "hi", "es", "ar"]}
          className="w-full p-2 rounded-lg cursor-pointer"  /* ✅ pointer */
        />
      </div>
    </div>
  );
};

export default LanguageSwitcher;
