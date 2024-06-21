import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './colorpicker.module.css';
import { X, ArrowLeft, ArrowRight } from 'react-feather';

interface ColorPickerProps {
    rowsInOnePage: number;
    columnsInOnePage: number;
    iconHeight: number;
    iconWidth: number;
    pickerHeight?: number;
    pickerWidth?: number;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSelectedImage: Dispatch<SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    rowsInOnePage,
    columnsInOnePage,
    iconHeight,
    iconWidth,
    pickerHeight = 500, 
    pickerWidth = 500, 
    setOpen,
    setSelectedImage
}) => {

    const importAll = (r:__WebpackModuleApi.RequireContext) => r.keys().map((key: string) => {
        return {
            src: r(key),
            id: key
        };
    });
    const icons = importAll(require.context('../icons', false, /\.svg$/));

    const [currentPage, setCurrentPage] = useState(1);
    const iconsPerPage = rowsInOnePage * columnsInOnePage;
    const totalPages = Math.ceil(icons.length / iconsPerPage);

    const currentIcons = icons.slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className={styles.menubox}>
            <div className={styles.headers}>
                <div></div>
                <div>
                    <ArrowLeft onClick={prevPage} cursor='pointer' style={{marginBottom:'-5px'}} /> 
                    <span className={styles.pagestatus}>
                        Viewing page {currentPage} of {totalPages}
                    </span>
                    <ArrowRight onClick={nextPage} cursor='pointer' style={{marginBottom:'-5px'}} />
                </div>
                <div>
                    <X onClick={()=>{setOpen(false)}} cursor='pointer' />
                </div>
            </div>
            <div className={styles.menu} style={{height: pickerHeight, width: pickerWidth}}>
                {currentIcons.map((icon, index) => {
                    return (
                        <div key={icon.id} className={styles.icon}>
                            <img src={icon.src} alt={`icon-${index}`} style={{height: iconHeight, width: iconWidth}} onClick={()=>{
                                setSelectedImage(icon.src)
                                setOpen(false)
                            }} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ColorPicker;