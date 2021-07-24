<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'name' => 'jorge.veliz1@gmail.com',
            'email' => 'jorge.veliz1@gmail.com',
            'password' =>123456789
        ];


        $data1 = [
            'name' => 'jorge.veliz13@gmail.com',
            'email' => 'jorge.veliz13@gmail.com',
            'password' =>123456789,
            'role' => 'normal',
        ];

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' =>$data['password'],
        ]);


        User::create([
            'name' => $data1['name'],
            'email' => $data1['email'],
            'password' =>$data1['password'],
        ]);
    }
}
