using Backend.Models;

namespace Backend.DTOs
{
    public class StoreDto : Store
    {
        public double DistanceInKm { get; set; }
        public bool IsOpen { get; set; }
        public new string OpenTime { get; set; }
        public new string CloseTime { get; set; }
    }
}
