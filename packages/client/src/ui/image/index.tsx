import React, { FC, useState } from "react";

import style from "./style.module.scss";
import cn from "classnames";

import Loader from "@/ui/loader";

export type TProps = {
  className?: string;
  src: string | null | undefined;
  alt?: string;
};

const Image: FC<TProps> = ({ className, src, alt }) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div className={cn(style.container, className)}>
      {imageLoading && <Loader.Content className={style.loader} />}

      {src && (
        <img
          src={src}
          alt={alt}
          style={{ display: imageLoading ? "none" : "block" }}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default Image;
