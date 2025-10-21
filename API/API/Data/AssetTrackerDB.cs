using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class AssetTrackerDB : DbContext
    {
        public AssetTrackerDB(DbContextOptions options) : base(options) {}

        public virtual DbSet<Asset> Assets { get; set; }
        public virtual DbSet<IssueReport> IssueReports { get; set; }
        public virtual DbSet<AssignmentHistory> AssignmentHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Asset>(entity =>
            {
                // Enum conversions
                entity.Property(e => e.Status).HasConversion<string>();

                //Unique asset tag
                entity
                    .HasIndex(e => e.AssetTag)
                    .IsUnique();

                // Add performance indexes for often queried properties - filtering
                // Drawback of indexes - slower writes, because it needs to update index
                // with each write + DB RAM load
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.CurrentOwnerEmail);
                
            });

            modelBuilder.Entity<IssueReport>(entity =>
            {
                // Enum conversions
                entity.Property(e => e.Status).HasConversion<string>();
                entity.Property(e => e.Priority).HasConversion<string>();

                // Performance indexes
                entity.HasIndex(e => e.Status);

                // Cascade delete with Asset model
                entity
                    .HasOne(e => e.Asset)
                    .WithMany(a => a.IssueReports)
                    .HasForeignKey(e => e.AssetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<AssignmentHistory>(entity =>
            {
                // Cascade delete
                 entity
                    .HasOne(e => e.Asset)
                    .WithMany(a => a.AssignmentHistory)
                    .HasForeignKey(e => e.AssetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
