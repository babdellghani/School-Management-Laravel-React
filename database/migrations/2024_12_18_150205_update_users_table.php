<?php

use App\Models\Parents;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'first_name');
            $table->string('last_name', 50)->after('first_name');
            $table->string('email', 60)->change();
            $table->string('avatar')->nullable()->after('email');
            $table->foreignIdFor(Parents::class)->after('avatar')->nullable()->constrained()->cascadeOnDelete();
            $table->dateTime('birth_date')->after('avatar')->nullable();
            $table->enum('gender', ['male', 'female'])->after('birth_date')->nullable();
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->after('gender')->nullable();
            $table->string('phone', 10)->unique()->after('blood_group')->nullable();
            $table->string('address')->after('phone')->nullable();
            $table->softDeletes()->after('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('first_name', 'name');
            $table->dropColumn(['last_name', 'avatar', 'birth_date', 'gender', 'blood_group', 'phone', 'address']);
            $table->dropForeignIdFor(Parents::class);
            $table->string('email')->change(); 
            $table->dropSoftDeletes(); 
        });
    }
};
