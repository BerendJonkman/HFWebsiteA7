﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFWebsiteA7.Models;
using HFWebsiteA7.Repositories.Interfaces;

namespace HFWebsiteA7.Repositories
{
    public class BandRepository : IBandRepository
    {
        private HFWebsiteA7Context db = new HFWebsiteA7Context();
        public void AddBand(Band band)
        {
            db.Bands.Add(band);
            db.SaveChanges();
        }

        public IEnumerable<Band> GetAllBands()
        {
            return db.Bands.ToList();
        }

        public Band GetBand(int bandId)
        {
            return db.Bands.Find(bandId);
        }

        public void RemoveBand(Band band)
        {
            db.Bands.Remove(band);
            db.SaveChanges();
        }

        public void UpdateBand(Band band)
        {
            var result = GetBand(band.Id);
            result.Name = band.Name;
            result.ImagePath = band.ImagePath;
            result.Description = band.Description;

            db.SaveChanges();
        }
    }
}