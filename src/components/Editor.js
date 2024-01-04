import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Gallery from './Gallery';
import { createBrowserHistory } from 'history';
const Editor = () => {

    const DEFAULT_OPTIONS = [
        {
          name: 'Brightness',
          property: 'brightness',
          value: 100,
          range: {
            min: 0,
            max: 200
          },
          unit: '%'
        },
        {
          name: 'Contrast',
          property: 'contrast',
          value: 100,
          range: {
            min: 0,
            max: 200
          },
          unit: '%'
        },
        {
          name: 'Saturation',
          property: 'saturate',
          value: 100,
          range: {
            min: 0,
            max: 200
          },
          unit: '%'
        },
        {
          name: 'Grayscale',
          property: 'grayscale',
          value: 0,
          range: {
            min: 0,
            max: 100
          },
          unit: '%'
        },
        {
          name: 'Sepia',
          property: 'sepia',
          value: 0,
          range: {
            min: 0,
            max: 100
          },
          unit: '%'
        },
        {
          name: 'Hue Rotate',
          property: 'hue-rotate',
          value: 0,
          range: {
            min: 0,
            max: 360
          },
          unit: 'deg'
        },
        {
          name: 'Blur',
          property: 'blur',
          value: 0,
          range: {
            min: 0,
            max: 20
          },
          unit: 'px'
        }
      ]

    const [image, setImage] = useState(null);
    const [filterOptions, setFilterOptions] = useState(DEFAULT_OPTIONS);
    const [downloadedImages, setDownloadedImages] = useState([]);
    const [openGallery, setOpenGallery] = useState(false);
    const customHistory = createBrowserHistory(); 

    function handleImage(e) {
        setImage(e.target.files[0]);
    }

    function applyFilter(property, value) {
        setFilterOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.property === property ? { ...option, value } : option
            )
        );
    }

    function handleSliderChange(property, newValue) {
        applyFilter(property, newValue);
    }

    function addToDownloadedImages(imageUrl) {
        setDownloadedImages([...downloadedImages, { original: imageUrl }]);
    }

    function handleGalleryClick() {
        setOpenGallery(true);
        customHistory.push('/Gallery');
    }


    function handleDownload() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const img = new Image();
        img.src = URL.createObjectURL(image);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.filter = filterOptions
                .map((option) => `${option.property}(${option.value}${option.unit})`)
                .join(' ');

            context.drawImage(img, 0, 0);

            const editedImageUrl = canvas.toDataURL('image/png');

            addToDownloadedImages(editedImageUrl);

            const link = document.createElement('a');
            link.download = 'edited-image.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    }

    return (
        <div>
            <div className='upload-download'>
                <Button variant="contained" component="label">
                    Upload <input type="file" onChange={handleImage} hidden />
                </Button>
                <Button variant="contained" onClick={handleDownload}>
                    Download
                </Button>
                <Button variant="contained" onClick={handleGalleryClick}>
                    Open Gallery
                </Button>
                {openGallery && (
                    <Gallery
                        images={downloadedImages}
                        onClose={() => setOpenGallery(false)}
                    />
                )}
            </div>
            <div>
                {image && (
                    <div className="main-image-container">
                        <img
                            className='main-image'
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                            style={{
                                filter: filterOptions
                                    .map((option) => `${option.property}(${option.value}${option.unit})`)
                                    .join(' ')
                            }}
                        />
                    </div>
                )}
                <div className="filter-options">
                    {filterOptions.map((option) => (
                        <div key={option.name} style={{ width: '50%', margin: '0 auto' }}>
                            <Button variant="outlined">{option.name}</Button>
                            <Slider
                                value={option.value}
                                min={option.range.min}
                                max={option.range.max}
                                onChange={(e, newValue) => handleSliderChange(option.property, newValue)}
                                aria-labelledby="continuous-slider"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Editor;