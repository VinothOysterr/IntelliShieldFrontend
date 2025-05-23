import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';


const QRCodeGenerator = ({ value, size = 150, bgColor = "#ffffff", fgColor = "#000000" }) => {
  return (
    <QRCodeCanvas
      value={value}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      level={"L"}
      includeMargin={false}
    />
  );
};

export default QRCodeGenerator;
