import { useState, useEffect } from 'react';

import styles from './ChangePhotoModal.module.scss';

//eslint-disable-next-line
import Avatar from '../../../../assets/images/profile-images/avatar-tablet-more.png';

export const ChangePhotoModal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setFile(selectedFile);
  };

  useEffect(() => {
    if (!file) {
      setPreview(null);

      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <section className={styles.changePhoto}>
      <div className={styles.changePhoto__container}>
        <p className={styles.changePhoto__title}>Change profile photo</p>

        <div className={styles.changePhoto__wrapper}>
          <label className={styles.customButton}>
            <input
              type="file"
              className={styles.changePhoto__file}
              onChange={handleChange}
              accept="image/*"
              hidden
            />

            <img
              src={preview || Avatar}
              alt="Profile preview"
              className={styles.changePhoto__image}
            />
          </label>

          <p className={styles.changePhoto__hint}>
            Click to upload an image directly from your device
          </p>
        </div>

        <div className={styles.changePhoto__buttons}>
          <button className={styles.changePhoto__secondary}>Cancel</button>
          <button className={styles.changePhoto__primary}>Save</button>
        </div>
      </div>
    </section>
  );
};
