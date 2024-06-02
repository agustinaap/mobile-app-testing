describe('Mobile testing', () => {

    describe('LOGIN', () => {
        before(async () => {
            // cek elemen homescreen muncul dengan menggunakan xpath
            searchBar = await $('//android.widget.TextView[@resource-id="com.kci.access:id/et_search"]');
            await expect(searchBar).toBeDisplayed();

            banner = await $('//androidx.recyclerview.widget.RecyclerView[@resource-id="com.kci.access:id/rv_banner"]');
            await expect(banner).toBeDisplayed();
    
            // klik login
            await $('//android.widget.ImageView[@resource-id="com.kci.access:id/iv_user_photo"]').click();
    
            // cek elemen untuk memastikan berada di halaman login
            const loginPage = await $('//android.widget.TextView[@resource-id="com.kci.access:id/text_title"]').getText();
            await expect(loginPage).toBe("Hai Commuters!");
    
            await driver.pause(1000);
          });
    
        it('Fail to login with invalid data - NEGATIVE', async () => {
            // mengakses field email dan memasukkan value ke dalamnya
            emailField = await $('//android.widget.EditText[@text="Email atau Nomor Telepon"]');
            await emailField.setValue("anne@mail.co");
    
            // mengakses field password dan memasukkan value ke dalamnya
            passwordField = await $('//android.widget.EditText[@text="Password"]');
            await passwordField.setValue("invalidPass.123");
    
            // klik tombol login
            buttonLogin = await $('//android.widget.Button[@resource-id="com.kci.access:id/btn_log_in"]');
            await buttonLogin.click();
    
            // cek muncul popup gagal login
            image = await $('//android.widget.ImageView[@resource-id="com.kci.access:id/iv_logo"]')
            title = await $('//android.widget.TextView[@resource-id="com.kci.access:id/tv_title"]').getText();
            info = await $('//android.widget.TextView[@resource-id="com.kci.access:id/tv_subtitle"]').getText();
            await expect(image).toBeExisting();
            await expect(title).toBe("Yah, ada sedikit masalah");
            await expect(info).toBe("Login gagal. Pastikan data yang Anda masukkan sudah benar.");
    
            // klik button X untuk menutup popup
            buttonX = await $('//android.widget.ImageView[@resource-id="com.kci.access:id/arrow_back"]');
            await buttonX.click();

            await driver.pause(1000);
        })
    
        it('Fail to login with no special char in password - NEGATIVE', async () => {
            // mengakses field email dan memasukkan value ke dalamnya
            await emailField.setValue("annesh0909@gmail.com");

            // mengakses field password dan memasukkan value ke dalamnya
            await passwordField.setValue("Anne123");
    
            // cek muncul alert password minimal 1 karakter spesial
            await expect($('~Error')).toBeDisplayed();
            const errorMessage = await $('//android.widget.TextView[@resource-id="com.kci.access:id/textinput_error"]');
            await expect(errorMessage).toBeExisting();
            await expect(errorMessage).toHaveText("Password minimal 1 karakter spesial.");
    
            await driver.pause(1000);
        })
    
        it('Login with valid data - POSITIVE', async () => {
            // mengakses field password dan memasukkan value ke dalamnya
            await passwordField.setValue("Annesmith.09");
    
            // klik tombol login
            await buttonLogin.click();
    
            // cek berhasil masuk ke homescreen dan terdapat nama user
            await expect(searchBar).toBeDisplayed();
            await expect(banner).toBeDisplayed();
    
            userName = await $('//android.widget.TextView[@resource-id="com.kci.access:id/tv_user_name"]');
            await expect(userName).toHaveText("ann");
    
            await driver.pause(1000);
        })
    })

    describe('UBAH PROFIL', () => {
        before(async () => {
            // klik user profile
            await $(userName).click();
    
            // cek elemen untuk memastikan berada di halaman user profile
            profilePage = await $('//android.widget.TextView[@text="Profil saya"]').getText();
            await expect(profilePage).toBe("Profil saya");
    
            await driver.pause(1000);
          });
    
        it('Change username - POSITIVE', async () => {
            // mengakses field username dan memasukkan value ke dalamnya
            usernameField = await $('//android.widget.EditText[@resource-id="com.kci.access:id/full_name"]');
            newUserName = "lala";
            await usernameField.setValue(newUserName);
    
            // klik tombol simpan
            await $('//android.widget.Button[@resource-id="com.kci.access:id/btn_save"]').click();

            await driver.pause(1000);
    
            // cek muncul popup berhasil ubah profil
            await expect(image).toBeExisting();
            await expect(title == "Update Profile Success");
    
            // klik button X untuk menutup popup
            await buttonX.click();

            await driver.pause(1000);

            // cek username berhasil diubah di halaman home
            await $('~Navigate up').click();
            await expect(userName).toHaveText(newUserName);

            await driver.pause(1000);

        })
    })

    describe('UBAH PASSWORD DI HALAMAN PROFIL SAYA', () => {
        before(async () => {
            // klik user profile
            await $(userName).click();
    
            // cek elemen untuk memastikan berada di halaman user profile
            await expect(profilePage).toBe("Profil saya");

            // klik menu ganti password
            await $('//android.widget.FrameLayout[@resource-id="com.kci.access:id/card_change_password"]').click();

            // cek elemen di halaman ganti password
            oldPasswordField = await $('//android.widget.EditText[@text="Masukan password lama"]');
            await expect(oldPasswordField).toBeExisting();

            newPasswordField = await $('//android.widget.EditText[@text="Masukan password baru"]');
            await expect(newPasswordField).toBeDisplayed();
            
            confirmNewPasswordField = await $('//android.widget.EditText[@text="Ketik ulang password baru"]')
            await expect(confirmNewPasswordField).toBeDisplayed();
    
            await driver.pause(1000);
          });
    
        it('Change password with invalid old password - NEGATIVE', async () => {
            // mengakses field password lama dan memasukkan value ke dalamnya
            await oldPasswordField.setValue("InvalidPass.123");

            // mengakses field password baru dan memasukkan value ke dalamnya
            await newPasswordField.setValue("Passbaru.12");

            // mengakses field konfirmasi password baru dan memasukkan value ke dalamnya
            await confirmNewPasswordField.setValue("Passbaru.12");
    
            // klik tombol selesai
            await $('//android.widget.Button[@resource-id="com.kci.access:id/btn_save"]').click();

            await driver.pause(1000);
    
            // cek muncul popup gagal ganti password
            await expect(image).toBeExisting();
            await expect(title).toBe("Yah, ada sedikit masalah");
            await expect(info == "Kata sandi yang Anda masukkan tidak sesuai");
    
            // klik button X untuk menutup popup
            await buttonX.click();
        })
    })
    
})