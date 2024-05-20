/*
 * Title: A Ecommerce Backend Application
 * Description: Common ecommerce backend application with full functionality
 * Author: Md Naim Uddin
 * Date: 20/05/2024
 *
 */

import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

(async () => {
  try {
    await mongoose.connect(config.db_uri!);
    console.log('Database connection established 🎉');
    app.listen(config.port, () => {
      console.log(`server listening on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
