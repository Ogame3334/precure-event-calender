import Image from "next/image";
import { useState } from "react";

const IconInput = ({icon, setIcon}: {icon: File | null, setIcon: Function}) => {
    const [imageSrc, setImageSrc] = useState<string>("/img/sample/icon/default.png");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            if (e.target?.result) {
              setImageSrc(e.target.result as string); // 画像を状態にセット
            }
          };
    
          reader.readAsDataURL(file); // DataURLとして画像を読み込む
          setIcon(file);
        }
      };
    
      const handleImageClick = () => {
        // 画像クリックでファイル選択ダイアログを開く
        document.getElementById('fileInput')?.click();
      };
    
    return (
        <div>
        <Image
        src={imageSrc}
        alt="icon"
        width={80}
        height={80}
        className="m-2 rounded-full"
        onClick={handleImageClick}
        />
        <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{display: 'none'}}
            accept="image/jpeg, image/png, image/webp"
        />
        </div>
    )
}

export {IconInput};
