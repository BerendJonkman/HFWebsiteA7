﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFWebsiteA7.Models;
using HFWebsiteA7.Repositories.Interfaces;

namespace HFWebsiteA7.Repositories.Classes
{
    public class FoodTypeRepository : IFoodTypeRepository
    {
        private HFWebsiteA7Context db = new HFWebsiteA7Context();

        public void AddFoodType(FoodType foodType)
        {
            db.FoodTypes.Add(foodType);
            db.SaveChanges();
        }

        public IEnumerable<FoodType> GetAllFoodTypes()
        {
            return db.FoodTypes.ToList();
        }

        public FoodType GetFoodType(int foodTypeId)
        {
            return db.FoodTypes.Find(foodTypeId);
        }
    }
}