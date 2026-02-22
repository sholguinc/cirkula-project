using System.Text.Json;
using Backend.Context;
using Backend.Models;

namespace Backend.Data
{
    public static class Seeder
    {
        public static void Run(AppDbContext context)
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Data", "Stores.json");

            var json = File.ReadAllText(path);
            var stores = JsonSerializer.Deserialize<List<Store>>(json)!;

            context.Stores.AddRange(stores);
            context.SaveChanges();

            Console.WriteLine("Seed done!");
        }
    }
}
