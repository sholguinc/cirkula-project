using Backend.Context;
using Backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class StoreService
    {
        private readonly AppDbContext _context;

        public StoreService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StoreDto>> ToListByLocationAsync(double latitude, double longitude)
        {
            var now = DateTime.Now.TimeOfDay;
            var stores = await _context.Stores.ToListAsync();

            var storesInfo = stores.Select(s =>
            {
                double distanceKm = GetDistanceInKm(latitude, longitude, s.Latitude, s.Longitude);
                bool isOpen = now >= s.OpenTime.TimeOfDay && now <= s.CloseTime.TimeOfDay;

                return new StoreDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    BannerUrl = s.BannerUrl,
                    Latitude = s.Latitude,
                    Longitude = s.Longitude,
                    OpenTime = s.OpenTime.ToString("hh:mm tt"),
                    CloseTime = s.CloseTime.ToString("hh:mm tt"),
                    DistanceInKm = distanceKm,
                    IsOpen = isOpen
                };
            }).ToList();

            var orderedStoresInfo = storesInfo.OrderBy(s => s.DistanceInKm).ToList();

            return orderedStoresInfo;
        }

        private static double GetDistanceInKm(double lat1, double lon1, double lat2, double lon2)
        {
            const double EARTH_RADIUS = 6371;

            double dLat = ToRadians(lat2 - lat1);
            double dLon = ToRadians(lon2 - lon1);

            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return EARTH_RADIUS * c;
        }

        private static double ToRadians(double angle)
        {
            return angle * Math.PI / 180.0;
        }
    }
}
