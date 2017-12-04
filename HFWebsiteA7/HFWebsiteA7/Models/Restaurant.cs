﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HFWebsiteA7.Models
{
    public class Restaurant
    {
        [Key]
        public virtual int Id { get; set; }
        public virtual int LocationId { get; set; }
        public virtual Location Location { get; set; }
        public virtual decimal Price { get; set; }
        public virtual decimal ReducedPrice { get; set; }
        public virtual int Stars { get; set; }
        public virtual string Description { get; set; }
    }
}